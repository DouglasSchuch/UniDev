import { Module } from '@nestjs/common';
import { ProblemTestService } from './problem-test.service';
import { ProblemTest } from './entities/problem-test.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';

@Module({
  imports: [SequelizeModule.forFeature([ProblemTest])],
  providers: [ProblemTestService, GeneralService],
  exports: [ProblemTestService]
})
export class ProblemTestModule {}
