import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';
import { ProblemResolved } from './entities/problem-resolved.entity';
import { ProblemResolvedController } from './problem-resolved.controller';
import { ProblemResolvedService } from './problem-resolved.service';

@Module({
  imports: [SequelizeModule.forFeature([ProblemResolved])],
  providers: [ProblemResolvedService, GeneralService],
  controllers: [ProblemResolvedController],
  exports: [ProblemResolvedService]
})
export class ProblemResolvedModule {}
