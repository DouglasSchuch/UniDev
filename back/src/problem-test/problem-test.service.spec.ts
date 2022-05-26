import { Test, TestingModule } from '@nestjs/testing';
import { ProblemTestService } from './problem-test.service';

describe('ProblemTestService', () => {
  let service: ProblemTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemTestService],
    }).compile();

    service = module.get<ProblemTestService>(ProblemTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
