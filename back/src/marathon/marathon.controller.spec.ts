import { Test, TestingModule } from '@nestjs/testing';
import { MarathonController } from './marathon.controller';
import { MarathonService } from './marathon.service';

describe('MarathonController', () => {
  let controller: MarathonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarathonController],
      providers: [MarathonService],
    }).compile();

    controller = module.get<MarathonController>(MarathonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
