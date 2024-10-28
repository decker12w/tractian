import { Module } from '@nestjs/common'
import { Encrypter } from './contracts/contract-encrypter'
import { HashGenerator } from './contracts/contract-hash-generator'
import { HashComparer } from './contracts/contract-hash-comparer'
import { JwtEncrypter } from './jwt-encrypter'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: HashComparer, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashGenerator, HashComparer],
})
export class CryptographyModule {}
