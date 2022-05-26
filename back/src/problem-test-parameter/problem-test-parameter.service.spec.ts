import { Test, TestingModule } from '@nestjs/testing';
import { ProblemTestParameterService } from './problem-test-parameter.service';

describe('ProblemTestParameterService', () => {
  let service: ProblemTestParameterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProblemTestParameterService],
    }).compile();

    service = module.get<ProblemTestParameterService>(ProblemTestParameterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
