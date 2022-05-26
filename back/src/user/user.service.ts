import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Login } from '../../../common/models/User';
import { User } from './entities/user.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(data: User, transaction: Transaction) {
    try {
      return await this.userModel.create(data, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findAll(transaction: Transaction = null) {
    try {
      return await this.userModel.findAll({ transaction });
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number, transaction: Transaction = null) {
    try {
      return await this.userModel.findByPk(id, { transaction });
    } catch (err) {
      throw err;
    }
  }

  async findByUsername(username: string, transaction: Transaction = null) {
    try {
      return await this.userModel.findOne({ where: { username }, transaction });
    } catch (err) {
      throw err;
    }
  }

  async login(data: Login, transaction: Transaction = null): Promise<User[]> {
    try {
      console.log('---> ', data);
      const user: User = await this.userModel.findOne({ where: { username: data.username }, transaction });
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      console.log(user.password, data.password)
      if (user.password != data.password) {
        throw new Error('Senha incorreta');
      }
      console.log('---> ', user);
      return [user];
    } catch (err) {
      throw err;
    }
  }

  update(id: number, data: User, transaction: Transaction) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number, transaction: Transaction) {
    return `This action removes a #${id} problem`;
  }
}
