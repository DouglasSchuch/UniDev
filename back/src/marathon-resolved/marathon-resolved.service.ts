import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { MarathonResolved } from './entities/marathon-resolved.entity';

@Injectable()
export class MarathonResolvedService {

  constructor(@InjectModel(MarathonResolved) private marathonResolvedModel: typeof MarathonResolved) {}

  async create(data: MarathonResolved, transaction: Transaction) {
    try {
      return await this.marathonResolvedModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAllByUserId(userId: number, transaction: Transaction = null) {
    try {
      return await this.marathonResolvedModel.findAll({ where: { userId }, transaction });
    } catch (err) {
      throw err;
    }
  }
}
