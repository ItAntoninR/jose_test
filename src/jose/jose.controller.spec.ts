import { Test, TestingModule } from '@nestjs/testing';
import { JoseController } from './jose.controller';
import { JoseService } from './jose.service';

describe('JoseController', () => {
  let controller: JoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JoseController],
      providers: [JoseService],
    }).compile();

    controller = module.get<JoseController>(JoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
