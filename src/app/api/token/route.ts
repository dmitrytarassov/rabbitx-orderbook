import {
  accountPrivateKey,
  apiURI,
  authMessage,
  RBT_API_KEY,
} from "@/app/utils/constants";
import { prepareSignature } from "@/app/api/utils/sign";
import { wallet } from "@/app/api/utils/wallet";
import { ExpirationTimestamp } from "@/app/api/utils/ExpirationTimestamp";
import { IResponse, postData } from "@/app/api/utils/postData";

const expirationTimestamp = new ExpirationTimestamp();

interface ApiResponse {
  jwt: string;
}

export async function GET() {
  const timestamp = expirationTimestamp.expirationTimestamp;

  const { preparedSignature } = await prepareSignature(
    authMessage,
    timestamp,
    accountPrivateKey
  );

  const data: IResponse<ApiResponse> = await postData<ApiResponse>(
    `${apiURI}/onboarding`,
    {
      signature: preparedSignature,
      wallet,
      isClient: false,
    },
    {
      "RBT-TS": timestamp,
      "RBT-API-KEY": RBT_API_KEY,
    }
  );

  const token = data?.result?.[0]?.jwt;

  return new Response(JSON.stringify({ token }));
}
