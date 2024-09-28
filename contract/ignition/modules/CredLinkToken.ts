import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CredLinkTokenModule = buildModule("CredLinkTokenModule", (m) => {

    const erc20 = m.contract("CredLinkToken");

    return { erc20 };
});

export default CredLinkTokenModule;
