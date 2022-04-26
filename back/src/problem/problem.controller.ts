import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Problem } from './entities/problem.entity';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { DBResult } from '../../../common/models/DBResult';
import { GeneralService } from 'src/services/general.service';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService, private sequelize: Sequelize, private general: GeneralService) {}

  //CREATE
  @Post()
  @ApiOperation({ summary: 'Create problem' })
  @ApiBody({ type: Problem })
  async create(@Body() data: Problem, @Res() response): Promise<DBResult> {
    const transaction: Transaction = await this.sequelize.transaction();
    return await this.problemService
      .create(data, transaction)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Created', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  //GET ALL PROBLEMS
  @Get()
  @ApiOperation({ summary: 'Get all problems' })
  async findAll(@Res() response): Promise<DBResult> {
    return await this.problemService
      .findAll()
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }

  //GET PROBLEM BY ID
  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'problem id', type: 'integer' })
  @ApiOperation({ summary: 'Get problem by id' })
  async findOne(@Param('id') id: number, @Res() response): Promise<DBResult> {
    return await this.problemService
      .findOne(+id)
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() data: Problem) {
  //   return this.problemService.update(+id, data);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.problemService.remove(+id);
  // }
}
