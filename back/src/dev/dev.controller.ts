// imports NestJS
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

// imports local
import { GeneralService } from '../services/general.service';
import { DBResult } from '../../../common/models/DBResult';
import { DevService } from './dev.service';
import { Run } from '../../../common/models/Run';

@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService, private sequelize: Sequelize, private general: GeneralService) {}

  @Post('/compile-and-exec')
  @ApiOperation({ summary: 'Compile and exec code' })
  @ApiBody({ type: Run })
  @ApiResponse({ type: DBResult })
  async change(@Body() data: Run, @Res() response) {
    const transaction: Transaction = await this.sequelize.transaction();
    return this.devService
      .compileAndExec(data)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Compile and execute successfully!', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }
}
