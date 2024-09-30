import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  // networks: {
  //   // for testnet
  //   "scroll-sepolia": {
  //     url: process.env.ALCHEMY_SCROLL_RPC_URL!,
  //     accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
  //   }
  // }
};

export default config;
