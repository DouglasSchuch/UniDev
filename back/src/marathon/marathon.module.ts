import { forwardRef, Module } from '@nestjs/common';
import { MarathonService } from './marathon.service';
import { MarathonController } from './marathon.controller';
import { Marathon } from './entities/marathon.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';
import { MarathonProblem } from 'src/marathon-problems/entities/marathon-problem.entity';
import { ProblemResolvedModule } from 'src/problem-resolved/problem-resolved.module';
import { ProblemModule } from 'src/problem/problem.module';
import { MarathonProblemsModule } from 'src/marathon-problems/marathon-problems.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Marathon, MarathonProblem])
    , forwardRef(() => ProblemModule)
    , forwardRef(() => ProblemResolvedModule)
    , forwardRef(() => MarathonProblemsModule)
  ],
  controllers: [MarathonController],
  providers: [MarathonService, GeneralService],
  exports: [MarathonService]
})
export class MarathonModule {}
