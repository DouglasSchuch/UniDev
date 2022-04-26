import { Module } from '@nestjs/common';
import { GeneralService } from '../services/general.service';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';

@Module({
  imports: [],
  controllers: [DevController],
  providers: [DevService, GeneralService],
  exports: [DevService],
})
export class DevModule {}
