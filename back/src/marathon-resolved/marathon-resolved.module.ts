import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeneralService } from 'src/services/general.service';
import { MarathonResolved } from './entities/marathon-resolved.entity';
import { MarathonResolvedController } from './marathon-resolved.controller';
import { MarathonResolvedService } from './marathon-resolved.service';

@Module({
  imports: [SequelizeModule.forFeature([MarathonResolved])],
  providers: [MarathonResolvedService, GeneralService],
  controllers: [MarathonResolvedController],
  exports: [MarathonResolvedService]
})
export class MarathonResolvedModule {}
