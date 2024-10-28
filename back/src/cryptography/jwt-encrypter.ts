import { JwtService } from '@nestjs/jwt'
import { Injectable } from '@nestjs/common'
import { Encrypter } from './contracts/contract-encrypter'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }
}
