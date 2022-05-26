import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';
import { MarathonProblem } from './entities/marathon-problem.entity';
import { MarathonProblemsService } from './marathon-problems.service';

@Module({
  imports: [SequelizeModule.forFeature([MarathonProblem])],
  providers: [MarathonProblemsService, GeneralService],
  exports: [MarathonProblemsService]
})
export class MarathonProblemsModule {}
