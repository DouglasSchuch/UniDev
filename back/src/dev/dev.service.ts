import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { ProblemResolved } from 'src/problem-resolved/entities/problem-resolved.entity';
import { ProblemResolvedService } from 'src/problem-resolved/problem-resolved.service';
import { ProblemTest } from 'src/problem-test/entities/problem-test.entity';
import { Problem } from 'src/problem/entities/problem.entity';
import { ProblemService } from 'src/problem/problem.service';
import { Run } from '../../../common/models/Run';

const fs = require('fs');
const uuid = require('uuid');
const { spawn } = require('child_process');

@Injectable()
export class DevService {
  constructor(private problemService: ProblemService) {}

  // Compila arquivo
  // javac test.java

  // executa e cria arquivo de saída
  // java "nome da class" > "nome do arquivo de saída"

  /**
  * Compila e executa um arquivo .java
  * @param {number} id number
  * @param {boolean} includeUnitTool (opcional) Promise<Loan>
  * @returns Promise<Loan>
  */
  async compileAndExec(run: Run) {
      let path: string | null = process.env.PATH_EXEC || null;
      if (!path) {
          throw new Error('Path not defined');
      }
      path = `${path}\\${uuid.v1()}`;

      const fileName: string = `test.java`;
      const code: string | null = run.code;
//       const code: string | null = `class ClassName {
//     public static void main(String[] args) {
//         String value1 = args[0];
//         String value2 = args[1];
//         System.out.println(Integer.parseInt(value1) - Integer.parseInt(value2) - 5);
//     }
// }`;
      try {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true });
        }

        // gera o arquivo
        await this.writeFile(path, fileName, code);

        // compila o código
        await this.compile(path, fileName);

        // busca o nome do arquivo gerado na compilação
        const classNames: string[] = this.findFileByExtension(path, 'class');
        if (classNames.length !== 1) {
            throw new Error('Internal error');
        }
        const className = classNames[0].split('.class')[0];
        
        // consulta o problema que está sendo resolvido
        const problem: Problem = await this.problemService.findOne(run.problemId);

        // executa a classe compilada
        const exec: boolean = await this.testCases(path, className, problem);
        if (!exec) {
            throw new Error('Rejeitado nos casos de teste');
        }

        const problemResolved: ProblemResolved = new ProblemResolved();
        problemResolved.problemId = run.problemId;
        problemResolved.resolvedMarathonId = run.marathonId;
        problemResolved.userId = run.userId;
        problemResolved.time = run.time;
        problemResolved.save();

        // remove a pasta criada
        // await fs.rmSync(`${path}\\exec`, { recursive: true, force: true });
        // await fs.rmSync(path, { recursive: true, force: true });

        return true;
      } catch (err) {
        throw err;
      }
  }

  /**
  * Gera um arquivo .java
  * @param {string} path diretório que o arquivo será gerado
  * @param {string} fileName nome do arquivo que será gerado
  * @param {string} value valor que será preenchido no arquivo
  * @returns Promise<boolean>
  */
  writeFile(path: string, fileName: string, value: string): Promise<boolean> {
      return new Promise<any>((resolve, reject) => {
          fs.writeFile(`${path}\\${fileName}`, value, async (writeErr: any) => {
              if (writeErr) {
                  return reject(`Error write file -> ${writeErr}`);
              }
              resolve(true);
          });
      });
  }

  findFileByExtension(path: string, ext: string) {
      const files: any = fs.readdirSync(path);
      const fileNames: string[] = [];

      files.forEach((fileName: any) => {
          if (fileName.substr(-1 * (ext.length + 1)) == '.' + ext) {
              fileNames.push(fileName)
          }
      });
      return fileNames;
  }

  /**
  * Compila um arquivo .java
  * @param {string} path diretório que está o arquivo para ser compilado
  * @param {string} fileName nome do arquivo que será compilado
  * @returns Promise<any>
  */
  compile(path: string, fileName: string): Promise<any> {
      return new Promise<any>((resolve, reject) => {
          const javac = spawn('javac', [`${path}\\${fileName}`]);
          
          javac.stdout.on('data', (data: any) => console.log(`stdout: ${data}`));
          
          javac.stderr.on('data', (data: any) => reject(data.toString()));
          
          javac.on('exit', (code: any) => resolve(code));
      });
  }

    async testCases(path: string, className: string, problem: Problem | null = null): Promise<any> {
        if (problem?.problemTests?.length) {
            for (let i = 0; i < problem.problemTests.length; i++) {
                const problemTest: ProblemTest = problem.problemTests[i];
                const completePath: string = `${path}\\exec\\${i}`;
                
                if (!fs.existsSync(completePath)){
                    await fs.mkdirSync(completePath, { recursive: true });
                }
                const out = fs.openSync(`${completePath}\\out.log`, 'a');
                const err = fs.openSync(`${completePath}\\err.log`, 'a');

                const parameters: any[] = ['-cp', path, className];

                if (problemTest.problemTestParameters?.length) {
                    for (let j = 0; j < problemTest.problemTestParameters.length; j++) {
                        parameters.push(problemTest.problemTestParameters[j].value);
                    }
                }

                const isValid: boolean = await this.exec(parameters, out, err, completePath, problemTest.result);
                if (!isValid) {
                    console.log('ERRO COMPARAÇÃO!!!!!');
                    return false;
                }
            }
        }
        return true;
    }

    /**
    * Executa um arquivo .class com os casos de teste
    * @returns Promise<boolean>
    */
    async exec(parameters: any[], out, err, completePath: string, result: string) {
        return new Promise<any>(async (resolve) => {
            const java = spawn(`java`, parameters, { stdio: ['ignore', out, err] });

            java.on('exit', async (code: any) => resolve(await this.validateResults(completePath, result)));
            
            java.on('error', (err: any) => resolve(false));
        });
    }

  /**
  * Valida os resultados obtidos
  * @param {string} path diretório principal
  * @returns Promise<boolean>
  */
  async validateResults(path: string, value: string): Promise<boolean> {
      try {
            // if (!fs.existsSync(`${path}\\results`)){
            //     fs.mkdirSync(`${path}\\results`, { recursive: true });
            // }
            const contentErr: string = (await fs.readFileSync(`${path}\\err.log`)).toString();
            if (contentErr !== '') {
                throw contentErr;
            }
            const content: string = (await fs.readFileSync(`${path}\\out.log`)).toString().trim();
            if (content !== value.trim()) {
                return false;
            }
            return true;
      } catch (err) {
            throw err;
      }
  }

  async getById(id: number) {

  }

  async post(data: Run) {

  }

  async put(id: number, data: any) {

  }

  async delete(id: number) {

  }
}
