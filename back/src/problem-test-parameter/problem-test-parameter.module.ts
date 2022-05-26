import { Module } from '@nestjs/common';
import { ProblemTestParameterService } from './problem-test-parameter.service';
import { ProblemTestParameter } from './entities/problem-test-parameter.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';

@Module({
  imports: [SequelizeModule.forFeature([ProblemTestParameter])],
  providers: [ProblemTestParameterService, GeneralService],
  exports: [ProblemTestParameterService]
})
export class ProblemTestParameterModule {}
