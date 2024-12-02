import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as jose from 'node-jose';

@Injectable()
export class JoseService {
  private jwsPrivateKey: jose.JWK.Key | null = null;
  private jwePublicKey: jose.JWK.Key | null = null;
  private jwePrivateKey: jose.JWK.Key | null = null;

  private async loadKeys() {
    if (!this.jwsPrivateKey || !this.jwePublicKey || !this.jwePrivateKey) {
      const jwsPrivatePem = readFileSync('src/key/jws/jws_private.pem', 'utf8');
      this.jwsPrivateKey = await jose.JWK.asKey(jwsPrivatePem, 'pem');

      const jwePublicPem = readFileSync('src/key/jwe/jwe_public.pem', 'utf8');
      this.jwePublicKey = await jose.JWK.asKey(jwePublicPem, 'pem');

      const jwePrivatePem = readFileSync('src/key/jwe/jwe_private.pem', 'utf8');
      this.jwePrivateKey = await jose.JWK.asKey(jwePrivatePem, 'pem');
    }
  }

  async generateSignedAndEncryptedkey(
    payload: any,
  ): Promise<{ status: boolean; token: string }> {
    try {
      await this.loadKeys();

      payload.exp = Math.floor(Date.now() / 1000) + 3600;
      payload.iat = Math.floor(Date.now() / 1000);

      const jwsToken = await jose.JWS.createSign(
        { format: 'compact' },
        this.jwsPrivateKey,
      )
        .update(JSON.stringify(payload))
        .final();

      const encryptedToken = await jose.JWE.createEncrypt(
        { format: 'compact', contentAlg: 'A128GCM' },
        this.jwePrivateKey,
      )
        .update(jwsToken)
        .final();

      return {
        status: true,
        token: encryptedToken,
      };
    } catch (error) {
      console.error('Error generating signed and encrypted ID token:', error);
      throw error;
    }
  }

  async decryptkey(token: string): Promise<any> {
    try {
      await this.loadKeys();

      if (!this.jwePrivateKey) {
        throw new Error('JWE private key not loaded');
      }
      const decryptedJWE = await jose.JWE.createDecrypt(
        this.jwePrivateKey,
      ).decrypt(token);
      const jwsToken = Buffer.from(decryptedJWE.payload).toString('utf8');
      const jwsPayload = await jose.JWS.createVerify(this.jwsPrivateKey).verify(
        jwsToken,
      );
      const payload = Buffer.from(jwsPayload.payload).toString('utf8');

      return payload;
    } catch (error) {
      console.error('Error decrypting token:', error);
      throw error;
    }
  }
}
