import { Test, TestingModule } from '@nestjs/testing';
import { ProblemResolvedService } from './problem-resolved.service';

describe('ProblemResolvedService', () => {
  let service: ProblemResolvedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemResolvedService],
    }).compile();

    service = module.get<ProblemResolvedService>(ProblemResolvedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
