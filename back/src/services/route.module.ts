// imports NEST
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// import local
import { GeneralService } from './general.service';
import { RouteService } from './route.service';

@Module({
  imports: [HttpModule],
  providers: [GeneralService, RouteService],
  exports: [RouteService],
})
export class RouteModule {}
