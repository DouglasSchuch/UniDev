import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ProblemController } from './problem.controller';
import { Problem } from './entities/problem.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';

@Module({
  imports: [SequelizeModule.forFeature([Problem])],
  controllers: [ProblemController],
  providers: [ProblemService, GeneralService],
  exports: [ProblemService]
})
export class ProblemModule {}
