import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { response } from 'express';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { GeneralService } from 'src/services/general.service';
import { DBResult } from '../../../common/models/DBResult';
import { RunMarathon } from '../../../common/models/Run';
import { Marathon } from './entities/marathon.entity';
import { MarathonService } from './marathon.service';

@Controller('marathon')
export class MarathonController {
  constructor(private readonly marathonService: MarathonService, private sequelize: Sequelize, private general: GeneralService) {}

  @Post()
  @ApiOperation({ summary: 'Create marathon' })
  async create(@Body() data: Marathon, @Res() response): Promise<DBResult> {
    const transaction: Transaction = await this.sequelize.transaction();
    return await this.marathonService
      .create(data, transaction)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Created', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  @Get()
  @ApiOperation({ summary: 'Get all marathons' })
  async findAll(@Res() response): Promise<DBResult> {
    return await this.marathonService
      .findAll()
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }

  @Get('/resolved/:userId/:marathonId')
  @ApiParam({ name: 'id', required: true, description: 'marathon id', type: 'integer' })
  @ApiOperation({ summary: 'Get marathon by id' })
  async findByUserProblemsStatus(@Param('userId') userId: number, @Param('marathonId') marathonId: number, @Res() response): Promise<DBResult> {
    return await this.marathonService
      .findByUserProblemsStatus(+userId, +marathonId)
      .then((res: any) => response.status(200).json(new DBResult('Ok', [res], true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'marathon id', type: 'integer' })
  @ApiOperation({ summary: 'Get marathon by id' })
  async findOne(@Param('id') id: number, @Res() response): Promise<DBResult> {
    return await this.marathonService
      .findOne(+id)
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }
  
  @Post('/finalize')
  @ApiOperation({ summary: 'Finalize marathon' })
  async finalizeMarathon(@Body() data: RunMarathon, @Res() response): Promise<DBResult> {
    const transaction: Transaction = await this.sequelize.transaction();
    return await this.marathonService
      .finalizeMarathon(data, transaction)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Finalized', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Marathon) {
    return this.marathonService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marathonService.remove(+id);
  }
}
