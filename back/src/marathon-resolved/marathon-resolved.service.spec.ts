import { Test, TestingModule } from '@nestjs/testing';
import { MarathonResolvedService } from './marathon-resolved.service';

describe('MarathonResolvedService', () => {
  let service: MarathonResolvedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarathonResolvedService],
    }).compile();

    service = module.get<MarathonResolvedService>(MarathonResolvedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
