import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProblemTest } from './entities/problem-test.entity';

@Injectable()
export class ProblemTestService {
  constructor(@InjectModel(ProblemTest) private problemTestModel: typeof ProblemTest) {}

  create(data: ProblemTest) {
    return 'This action adds a new problemTest';
  }

  findAll() {
    return `This action returns all problemTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problemTest`;
  }

  update(id: number, data: ProblemTest) {
    return `This action updates a #${id} problemTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} problemTest`;
  }
}
