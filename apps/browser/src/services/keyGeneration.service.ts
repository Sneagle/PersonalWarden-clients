import { CryptoFunctionService } from "@personalwarden/common/abstractions/cryptoFunction.service";
import { SymmetricCryptoKey } from "@personalwarden/common/models/domain/symmetric-crypto-key";

import { AbstractKeyGenerationService } from "./abstractions/abstractKeyGeneration.service";

export class KeyGenerationService implements AbstractKeyGenerationService {
  constructor(private cryptoFunctionService: CryptoFunctionService) {}

  async makeEphemeralKey(numBytes = 16): Promise<SymmetricCryptoKey> {
    const keyMaterial = await this.cryptoFunctionService.randomBytes(numBytes);
    const key = await this.cryptoFunctionService.hkdf(
      keyMaterial,
      "personalwarden-ephemeral",
      "ephemeral",
      64,
      "sha256"
    );
    return new SymmetricCryptoKey(key);
  }
}
