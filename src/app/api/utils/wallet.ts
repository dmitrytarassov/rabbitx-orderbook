import { ethers } from "ethers";
import { accountPrivateKey } from "@/app/utils/constants";

export const wallet = new ethers.Wallet(accountPrivateKey).address;
