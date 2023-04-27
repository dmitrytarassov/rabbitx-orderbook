import { ethers } from "ethers";
import { hashMessage } from "ethers/lib/utils";

export interface SignRequest {
  message: string;
  timestamp: number;
}

export interface VerifyRequest {
  message: string;
  wallet: string;
  timestamp: number;
  signature: string;
}

export function hex2bytes(hex: string): Uint8Array {
  return ethers.utils.arrayify(hex);
}

export const getMessage = (message: string, timestamp: number): string =>
  `${message}\n${timestamp}`;

export async function sign(
  request: SignRequest,
  privateKey: string
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  const messageToSign = getMessage(request.message, request.timestamp);

  // 👇 I don't know why, but this line broke the signature
  // const message = ethers.utils.hexDataSlice(ethers.utils.id(messageToSign), 0);
  const signedMessage = await wallet.signMessage(messageToSign);

  return signedMessage;
}

export function verify(request: VerifyRequest): boolean {
  const messageToVerify = getMessage(request.message, request.timestamp);
  const message = ethers.utils.hexDataSlice(
    ethers.utils.id(messageToVerify),
    0
  );
  const signature = request.signature;
  const recoveredWallet = ethers.utils.verifyMessage(message, signature);

  if (recoveredWallet.toLowerCase() !== request.wallet.toLowerCase()) {
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp >= request.timestamp) {
    return false;
  }

  return true;
}

export const prepareSignature = async (
  message: string,
  timestamp: number,
  privateKey: string
): Promise<{ originalSignature: string; preparedSignature: string }> => {
  const signRequest: SignRequest = {
    message,
    timestamp,
  };
  const signature = await sign(signRequest, privateKey);

  const signatureBytes = new Uint8Array(hex2bytes(signature));
  signatureBytes[signatureBytes.length - 1] =
    signatureBytes[signatureBytes.length - 1] % 27;

  const _sig = ethers.utils.hexlify(signatureBytes);

  return {
    originalSignature: signature,
    preparedSignature: _sig.startsWith("0x") ? _sig : `0x${_sig}`,
  };
};

export async function recoverAddress(
  signature: string,
  message: string
): Promise<string> {
  return ethers.utils.recoverAddress(hashMessage(message), signature);
}
