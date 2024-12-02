import { Injectable } from '@nestjs/common';
import base64url from 'base64url';
import { createSign } from 'crypto';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  generateBase64Token(): string {
    const privateKey = readFileSync('private_key.pem', 'utf8');
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    const payload = {
      sub: 'bsachhref@gmail.com',
      name: 'BOUSNINA Achraf',
    };

    const decodedHeader = base64url(JSON.stringify(header));
    const decodedPayload = base64url(JSON.stringify(payload));
    const signature = createSign('RSA-SHA256');
    signature.update(`${decodedHeader}.${decodedPayload}`);
    signature.end();

    const signedBase64Token = signature.sign(privateKey, 'base64');

    return `${decodedHeader}.${decodedPayload}.${signedBase64Token}`;
  }
}
