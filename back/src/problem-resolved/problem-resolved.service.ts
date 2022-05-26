import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Problem } from 'src/problem/entities/problem.entity';
import { ProblemResolved } from './entities/problem-resolved.entity';

@Injectable()
export class ProblemResolvedService {
  constructor(@InjectModel(ProblemResolved) private problemResolvedModel: typeof ProblemResolved) {}

  async create(data: ProblemResolved, transaction: Transaction) {
    try {
      return await this.problemResolvedModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAll(transaction: Transaction = null) {
    try {
      return await this.problemResolvedModel.findAll({ transaction });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, transaction: Transaction = null) {
    try {
      return await this.problemResolvedModel.findByPk(id, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserId(userId: number, transaction: Transaction = null) {
    try {
      return await this.problemResolvedModel.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('problemId')), 'problemId'], 'time'], where: { userId }, transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAllByMarathonId(resolvedMarathonId: number, transaction: Transaction = null) {
    try {
      return await this.problemResolvedModel.findAll({ attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('time')), 'time']], where: { resolvedMarathonId }, transaction });
    } catch (err) {
      throw err;
    }
  }

  async findByUserAndMarathon(userId: number, resolvedMarathonId: number, transaction: Transaction = null) {
    try {
      return await this.problemResolvedModel.findAll({ where: { userId, resolvedMarathonId }, include: [Problem], transaction });
    } catch (err) {
      throw err;
    }
  }

  // update(id: number, data: ProblemResolved) {
  //   return `This action updates a #${id} problemResolved`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} problemResolved`;
  // }
}
