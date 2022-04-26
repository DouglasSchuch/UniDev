import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Run } from '../../../common/models/Run';

const fs = require('fs');
const uuid = require('uuid');
const { spawn } = require('child_process');

@Injectable()
export class DevService {
  constructor() {}

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
      console.log('------> ', run);
      let path: string | null = process.env.PATH_EXEC || null;
      if (!path) {
          throw new Error('Path not defined');
      }
      path = `${path}\\${uuid.v1()}`;

      const fileName: string = `test.java`;
      const code: string | null = run.code;
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
          
          // executa a classe compilada
          const exec: any = await this.exec(path, className);
          if (exec > 0) {
              // detecta erro no arquivo gerado
          }
          // valida os resultados obtidos com os esperados
          const isValid: boolean = await this.validateResults(path);

          // remove a pasta criada
          // await fs.rmSync(`${path}\\exec`, { recursive: true, force: true });
          // await fs.rmSync(path, { recursive: true, force: true });

          return isValid;
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

  /**
  * Executa um arquivo .class
  * @param {string} path diretório que está o .class que será executado
  * @param {string} className nome da classe Java
  * @returns Promise<any>
  */
  async exec(path: string, className: string): Promise<any> {
      if (!fs.existsSync(`${path}\\exec`)){
          await fs.mkdirSync(`${path}\\exec`, { recursive: true });
      }
      const out = fs.openSync(`${path}\\exec\\out.log`, 'a');
      const err = fs.openSync(`${path}\\exec\\err.log`, 'a');
      return new Promise<any>((resolve, reject) => {
          const java = spawn(`java`, ['-cp', path, className], { stdio: ['ignore', out, err] });

          java.on('exit', (code: any) => resolve(code));
          
          java.on('error', (err: any) => reject(err));
      });
  }

  /**
  * Valida os resultados obtidos
  * @param {string} path diretório principal
  * @returns Promise<boolean>
  */
  async validateResults(path: string): Promise<boolean> {
      try {
          // if (!fs.existsSync(`${path}\\results`)){
          //     fs.mkdirSync(`${path}\\results`, { recursive: true });
          // }
          const contentErr: string = (await fs.readFileSync(`${path}\\exec\\err.log`)).toString();
          if (contentErr !== '') {
              throw contentErr;
          }
          const valuesDatabase: string[] = ['Hello, World!'];
          for (let i = 0; i < valuesDatabase.length; i++) {
              const content: string = (await fs.readFileSync(`${path}\\exec\\out.log`)).toString().trim();
              if (content !== valuesDatabase[i].trim()) {
                  return false;
              }
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
