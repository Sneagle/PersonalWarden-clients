import { SymmetricCryptoKey } from "@personalwarden/common/models/domain/symmetric-crypto-key";

export interface AbstractKeyGenerationService {
  makeEphemeralKey(numBytes?: number): Promise<SymmetricCryptoKey>;
}
