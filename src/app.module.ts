import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JoseModule } from './jose/jose.module';

@Module({
  imports: [JoseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
