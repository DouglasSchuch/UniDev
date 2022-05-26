import { forwardRef, Module } from '@nestjs/common';
import { ProblemModule } from 'src/problem/problem.module';
import { GeneralService } from '../services/general.service';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';

@Module({
  imports: [forwardRef(() => ProblemModule)],
  controllers: [DevController],
  providers: [DevService, GeneralService],
  exports: [DevService],
})
export class DevModule {}
