import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getBase64DecodedValues(): string {
    return this.appService.generateBase64Token();
  }
}
