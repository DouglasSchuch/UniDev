import { Test, TestingModule } from '@nestjs/testing';
import { MarathonProblemsService } from './marathon-problems.service';

describe('MarathonProblemsService', () => {
  let service: MarathonProblemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarathonProblemsService],
    }).compile();

    service = module.get<MarathonProblemsService>(MarathonProblemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
