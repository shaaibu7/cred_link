import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("CredLinkContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployToken() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const credLinkToken = await hre.ethers.getContractFactory("CredLinkToken");
    const token = await credLinkToken.deploy();

    return { token };
  }

  async function deployCredLink() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken)

    const credLinkContract = await hre.ethers.getContractFactory("CredLinkContract");
    const credLink = await credLinkContract.deploy(token);

    return { credLink, owner, otherAccount, token };
  }


  describe("Test Deployment successful", function () {
    it("Should check token is correct on deployment", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      expect(await credLink.tokenAddress()).to.eq(token);
    });

  })

  describe("Test lenderDeposit function", function () {
    it("Should revert when amount is less than one", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      await expect(credLink.lenderDeposit(0)).to.be.revertedWith("cannot send zero token");
    });

    it("Should revert with insufficient funds", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      const amountToSend = ethers.parseUnits("100", 18);
      await expect(credLink.connect(otherAccount).lenderDeposit(amountToSend)).to.be.revertedWithCustomError(
        credLink,
        "InsufficientBalance()"
      ).withArgs();
    });

    it("Should successfully send funds", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await expect(credLink.connect(owner).lenderDeposit(amountToSend)).to.emit(
        credLink,
        "LenderDepositSuccessful"
      ).withArgs(owner, amountToSend)
    });

    it("Should successfully increment user balance on the contract", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await expect(credLink.connect(owner).lenderDeposit(amountToSend)).to.emit(
        credLink,
        "LenderDepositSuccessful"
      ).withArgs(owner, amountToSend)

      expect(await credLink.getLenderBalance()).to.eq(amountToSend);
    });

  })

  describe("Test lenderDeposit function", function () {
    it("Should fail when lender has low funds send funds", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      expect(credLink.applyForLoan(owner, ))
    });

  })
});
