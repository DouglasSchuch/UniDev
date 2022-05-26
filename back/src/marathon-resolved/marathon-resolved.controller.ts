import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { DBResult } from '../../../common/models/DBResult';
import { GeneralService } from 'src/services/general.service';
import { MarathonResolvedService } from './marathon-resolved.service';

@Controller('marathon-resolved')
export class MarathonResolvedController {
  constructor(private readonly marathonResolvedService: MarathonResolvedService, private general: GeneralService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all marathons resolved by userId' })
  @ApiParam({ name: 'userId', required: true, description: 'user id', type: 'integer' })
  async findAllByUserId(@Param('userId') userId: number, @Res() response): Promise<DBResult> {
    return await this.marathonResolvedService
      .findAllByUserId(userId)
      .then((res: any) => response.status(200).json(new DBResult('Ok', res, true)))
      .catch((err: any) => response.status(500).json(new DBResult(err.message, err, false)));
  }
}
