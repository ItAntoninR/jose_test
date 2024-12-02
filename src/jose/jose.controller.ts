import { Controller, Get, Post, Body } from '@nestjs/common';
import { JoseService } from './jose.service';

@Controller('jose')
export class JoseController {
  constructor(private readonly joseService: JoseService) {}

  @Get('token')
  generateJoseToken() {
    const payload = {
      name: 'BOUSNINA Achraf',
      email: 'bsachref@gmail.com',
    };
    return this.joseService.generateSignedAndEncryptedkey(payload);
  }

  @Post('decrypt')
  decodePayload(@Body() data: any) {
    return this.joseService.decryptkey(data.key);
  }
}
