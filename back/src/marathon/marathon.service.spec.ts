import { Test, TestingModule } from '@nestjs/testing';
import { MarathonService } from './marathon.service';

describe('MarathonService', () => {
  let service: MarathonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarathonService],
    }).compile();

    service = module.get<MarathonService>(MarathonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
