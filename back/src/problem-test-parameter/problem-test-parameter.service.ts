import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProblemTestParameter } from './entities/problem-test-parameter.entity';

@Injectable()
export class ProblemTestParameterService {
  constructor(@InjectModel(ProblemTestParameter) private problemTestParameterModel: typeof ProblemTestParameter) {}

  create(data: ProblemTestParameter) {
    return 'This action adds a new problemTestParameter';
  }

  findAll() {
    return `This action returns all problemTestParameter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problemTestParameter`;
  }

  update(id: number, data: ProblemTestParameter) {
    return `This action updates a #${id} problemTestParameter`;
  }

  remove(id: number) {
    return `This action removes a #${id} problemTestParameter`;
  }
}
