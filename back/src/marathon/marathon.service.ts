import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { MarathonProblem } from 'src/marathon-problems/entities/marathon-problem.entity';
import { MarathonProblemsService } from 'src/marathon-problems/marathon-problems.service';
import { MarathonResolved } from 'src/marathon-resolved/entities/marathon-resolved.entity';
import { ProblemResolved } from 'src/problem-resolved/entities/problem-resolved.entity';
import { ProblemResolvedService } from 'src/problem-resolved/problem-resolved.service';
import { Problem } from 'src/problem/entities/problem.entity';
import { ProblemService } from 'src/problem/problem.service';
import { User } from 'src/user/entities/user.entity';
import { RunMarathon } from '../../../common/models/Run';
import { Marathon } from './entities/marathon.entity';

@Injectable()
export class MarathonService {
  constructor(
    @InjectModel(Marathon) private marathonModel: typeof Marathon
    , private problemService: ProblemService
    , private problemResolvedService: ProblemResolvedService
    , private marathonProblemService: MarathonProblemsService
    ) {}

  async create(data: Marathon, transaction: Transaction) {
    try {
      return await this.marathonModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAll(transaction: Transaction = null) {
    try {
      return await this.marathonModel.findAll({ transaction });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, transaction: Transaction = null): Promise<Marathon> {
    try {
      return await this.marathonModel.findByPk(id, { include: [{ model: MarathonProblem, include: [Problem] }, { model: User }], transaction });
    } catch (err) {
      throw err;
    }
  }

  async findByUserProblemsStatus(userId: number, marathonId: number, transaction: Transaction = null) {
    try {
      const problems: any = { resolved: [], notResolved: [] };
      const resolved: ProblemResolved[] = await this.problemResolvedService.findByUserAndMarathon(userId, marathonId, transaction);
      if (resolved?.length) {
        for (let i = 0; i < resolved.length; i++) {
          problems.resolved.push(resolved[i].problem);
        }
      }

      const marathon: Marathon = await this.findOne(marathonId, transaction);
      const allProblems: Problem[] = [];
      if (marathon.marathonProblems?.length) {
        for (let i = 0; i < marathon.marathonProblems.length; i++) {
          allProblems.push(marathon.marathonProblems[i].problem);
        }
      }

      if (allProblems?.length) {
        for (let i = 0; i < allProblems.length; i++) {
          if (!problems.resolved.find((r: Problem) => r.id === allProblems[i].id)) {
            problems.notResolved.push(allProblems[i]);
          }
        }
      }

      return problems;
    } catch (err) {
      throw err;
    }
  }

  async finalizeMarathon(data: RunMarathon, transaction: Transaction) {
    try {
      // busca todos os problemas da maratona
      const marathonProblems: MarathonProblem[] = await this.marathonProblemService.findAllByMarathonId(data.marathonId);
      if (!marathonProblems.length) {
        throw new Error('Nenhum problema cadastrado para essa maratona');
      }

      // busca todos os problemas resolvidos da maratona
      const problemsResolved: ProblemResolved[] = await this.problemResolvedService.findByUserAndMarathon(data.userId, data.marathonId);
      if (problemsResolved.length != marathonProblems.length) {
        throw new Error('Existem problemas nãor resolvidos');
      }

      // calcula o tempo total
      let totalTime: number = 0;
      problemsResolved.forEach((pr: ProblemResolved) => totalTime += pr.time);
      
      const mr: MarathonResolved = new MarathonResolved();
      mr.marathonId = data.marathonId
      mr.userId = data.userId;
      mr.time = totalTime;
      return await mr.save({ transaction });
    } catch (err) {
      throw err;
    }
  }

  update(id: number, data: Marathon) {
    return `This action updates a #${id} marathon`;
  }

  remove(id: number) {
    return `This action removes a #${id} marathon`;
  }
}
