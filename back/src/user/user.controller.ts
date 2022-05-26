import { Controller, Get, Post, Body, Param, Delete, Put, Res } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { GeneralService } from 'src/services/general.service';
import { Login } from '../../../common/models/User';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private sequelize: Sequelize, private general: GeneralService) {}

  @Post()
  async create(@Body() data: User, @Res() response) {
    const transaction: Transaction = await this.sequelize.transaction();
    return await this.userService
      .create(data, transaction)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Created', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  @Post('/login')
  async login(@Body() data: Login, @Res() response) {
    const transaction: Transaction = await this.sequelize.transaction();
    return await this.userService.login(data, transaction)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Success', res, transaction)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  @Get()
  findAll(@Res() response) {
    return this.userService.findAll()
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Success', res)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err)));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response) {
    return this.userService.findOne(+id)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Success', res)))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err)));
  }

  @Get('/username/:username')
  findByUsername(@Param('username') username: string, @Res() response) {
    return this.userService.findByUsername(username)
      .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Success', [res])))
      .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err)));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: User) {
    // const transaction: Transaction = await this.sequelize.transaction();
    // return await this.userService
    //   .update(+id, data, transaction)
    //   .then(async (res: any) => response.status(201).json(await this.general.sucessResult('Created', res, transaction)))
    //   .catch(async (err: any) => response.status(500).json(await this.general.errorResult(err.message, err, transaction)));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.userService.remove(+id);
  }
}
