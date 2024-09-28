import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x233A66dB39b5BA93993383b2B4E08E6FA81be8AB";

const CredLinkModule = buildModule("CredLinkModule", (m) => {

    const erc20 = m.contract("CredLinkContract", [tokenAddress]);

    return { erc20 };
});

export default CredLinkModule;
