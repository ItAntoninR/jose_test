import { Module } from '@nestjs/common';
import { JoseService } from './jose.service';
import { JoseController } from './jose.controller';

@Module({
  controllers: [JoseController],
  providers: [JoseService],
})
export class JoseModule {}
