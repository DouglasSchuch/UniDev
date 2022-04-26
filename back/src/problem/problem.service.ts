import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Problem } from './entities/problem.entity';

@Injectable()
export class ProblemService {
  constructor(@InjectModel(Problem) private problemModel: typeof Problem) {}

  async create(data: Problem, transaction: Transaction) {
    try {
      return await this.problemModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAll(transaction: Transaction = null) {
    try {
      return await this.problemModel.findAll({ transaction });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, transaction: Transaction = null) {
    try {
      return await this.problemModel.findByPk(id, { transaction });
    } catch (err) {
      throw err;
    }
  }

  update(id: number, data: Problem, transaction: Transaction) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number, transaction: Transaction) {
    return `This action removes a #${id} problem`;
  }
}
