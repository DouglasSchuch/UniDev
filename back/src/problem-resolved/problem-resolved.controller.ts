import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { DBResult } from '../../../common/models/DBResult';
import { GeneralService } from 'src/services/general.service';
import { ProblemResolvedService } from './problem-resolved.service';

@Controller('problem-resolved')
export class ProblemResolvedController {
  constructor(private readonly problemResolvedService: ProblemResolvedService, private general: GeneralService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all problems resolved by userId' })
  @ApiParam({ name: 'userId', required: true, description: 'user id', type: 'integer' })
  async findAllByUserId(@Param('userId') userId: number, @Res() response): Promise<DBResult> {
    return await this.problemResolvedService
      .findAllByUserId(userId)
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }

  @Get('marathon/:marathonId')
  @ApiOperation({ summary: 'Get all problems resolved by marathonId' })
  @ApiParam({ name: 'marathonId', required: true, description: 'user id', type: 'integer' })
  async findAllByMarathonId(@Param('marathonId') marathonId: number, @Res() response): Promise<DBResult> {
    return await this.problemResolvedService
      .findAllByMarathonId(marathonId)
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }
}
