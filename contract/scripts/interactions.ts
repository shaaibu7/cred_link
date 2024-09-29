import { ethers } from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";

async function main() {
    const CredLinkTokenAddress = "0x40d58a9B08360945980c4F0539C7AeAc6e3B9D9b";
    const CredLinkToken = await ethers.getContractAt("IERC20", CredLinkTokenAddress);

    const CredLinkContractAddress = "0x422da85a9D29d9888d33e5a6B5DaA27206bB592E";
    const CredLink = await ethers.getContractAt("ICredLink", CredLinkContractAddress);

    // Approve savings contract to spend token
    const approvalAmount = ethers.parseUnits("1000", 18);

    // const userAddress = "0x8aF9f20A01e76f5a982923AD867f53d37282e4A3";
    // const approveTx = await CredLinkToken.approve(userAddress, approvalAmount);
    // approveTx.wait();

    // console.log("=============================================")
    // const userAddress = "0x8aF9f20A01e76f5a982923AD867f53d37282e4A3";
    // const approveTx = await CredLinkToken.transfer(userAddress, approvalAmount);
    // approveTx.wait();
    // console.log("completed tx successfully")
    
    // console.log("=============================================================");
    // console.log("Approval to spend token completed");

    const depositAmount = ethers.parseUnits("150", 18);
    await console.log(await CredLinkToken.balanceOf("0xE859ac304020Dd3039082827d2Cbd25979297BDD"));
    // const depositTx = await CredLink.lenderDeposit(depositAmount);

    // console.log(depositTx);

    // depositTx.wait();
    // const transferAmount = ethers.parseUnits("100", 18);
    // const lenderAddress = "0xE859ac304020Dd3039082827d2Cbd25979297BDD";
    // const applyLoanTx = await CredLink.applyForLoan(
    //     lenderAddress,
    //     1727410318,
    //     transferAmount,
    //     {
    //         gasLimit: 1000000
    //     }
    // )

    // console.log(applyLoanTx);

    // // console.log(applyLoanTx)
    // applyLoanTx.wait();
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
