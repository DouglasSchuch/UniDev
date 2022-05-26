// imports NEST
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// imports local
import { DevModule } from './dev/dev.module';
import { GeneralService } from './services/general.service';
import { RouteModule } from './services/route.module';
import { ProblemModule } from './problem/problem.module';
import { UserModule } from './user/user.module';
import { MarathonModule } from './marathon/marathon.module';
import { MarathonProblemsModule } from './marathon-problems/marathon-problems.module';
import { ProblemResolvedModule } from './problem-resolved/problem-resolved.module';
import { ProblemTestModule } from './problem-test/problem-test.module';
import { ProblemTestParameterModule } from './problem-test-parameter/problem-test-parameter.module';
import { MarathonResolvedModule } from './marathon-resolved/marathon-resolved.module';
const database = require('./config/database');

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(database[process.env.NODE_ENV ?? 'development']),
    DevModule,
    RouteModule,
    ProblemModule,
    UserModule,
    MarathonModule,
    MarathonProblemsModule,
    ProblemResolvedModule,
    ProblemTestModule,
    ProblemTestParameterModule,
    MarathonResolvedModule,
  ],
  controllers: [],
  providers: [GeneralService],
})
export class AppModule {}
