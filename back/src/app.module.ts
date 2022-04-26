// imports NEST
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// imports local
import { DevModule } from './dev/dev.module';
import { GeneralService } from './services/general.service';
import { RouteModule } from './services/route.module';
import { ProblemModule } from './problem/problem.module';
const database = require('./config/database');

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(database[process.env.NODE_ENV ?? 'development']),
    DevModule,
    RouteModule,
    ProblemModule,
  ],
  controllers: [],
  providers: [GeneralService],
})
export class AppModule {}
