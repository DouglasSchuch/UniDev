import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { MarathonProblem } from './entities/marathon-problem.entity';

@Injectable()
export class MarathonProblemsService {
  constructor(@InjectModel(MarathonProblem) private marathonProblemModel: typeof MarathonProblem) {}

  async create(data: MarathonProblem, transaction: Transaction) {
    try {
      return await this.marathonProblemModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAll(transaction: Transaction = null) {
    try {
      return await this.marathonProblemModel.findAll({ transaction });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, transaction: Transaction = null) {
    try {
      return await this.marathonProblemModel.findByPk(id, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAllByMarathonId(marathonId: number, transaction: Transaction = null) {
    try {
      return await this.marathonProblemModel.findAll({ where: { marathonId }, transaction });
    } catch (err) {
      throw err;
    }
  }

  update(id: number, data: MarathonProblem) {
    return `This action updates a #${id} marathonProblem`;
  }

  remove(id: number) {
    return `This action removes a #${id} marathonProblem`;
  }
}
