import { Test, TestingModule } from '@nestjs/testing';
import { JoseService } from './jose.service';

describe('JoseService', () => {
  let service: JoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoseService],
    }).compile();

    service = module.get<JoseService>(JoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
