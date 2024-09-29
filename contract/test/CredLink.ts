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
    const [owner, otherAccount, account1] = await hre.ethers.getSigners();

    const { token } = await loadFixture(deployToken)

    const credLinkContract = await hre.ethers.getContractFactory("CredLinkContract");
    const credLink = await credLinkContract.deploy(token);

    return { credLink, owner, otherAccount,account1, token };
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

  describe("Test applyForLoan function", function () {
    it("Should fail when lender has low funds send funds", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      const transferAmount = ethers.parseUnits("40", 18);
      expect(credLink.connect(otherAccount).applyForLoan(
        owner,
        7,
        transferAmount
      )).to.revertedWith("Not Available");
    });

    it("Should borrow successfully", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend)

      
      const transferAmount = ethers.parseUnits("40", 18);
      const duration = 7;
      await expect(credLink.connect(otherAccount).applyForLoan(
        owner,
        duration,
        transferAmount
      )).to.emit(
        credLink,
        "BorrowerApplySuccessful"
      ).withArgs(owner, otherAccount, transferAmount, duration);
    });

    it("Should fail if borrower wants to borrow more than what lender has", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend)

      
      const transferAmount = ethers.parseUnits("110", 18);
      const duration = 7;
      await expect(credLink.connect(otherAccount).applyForLoan(
        owner,
        duration,
        transferAmount
      )).to.revertedWith("lender does not have sufficient funds");
    });

    // // it("Borrow should fail when borrow twice", async function () {
    // //   const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

    // //   // lender deposit processs
    // //   const amountToSend = ethers.parseUnits("100", 18);

    // //   await token.connect(owner).approve(credLink, amountToSend);

    // //   await credLink.connect(owner).lenderDeposit(amountToSend)

      
    // //   const transferAmount = ethers.parseUnits("40", 18);
    // //   const duration = 7;

    // //   const firstBorrow = await credLink.connect(otherAccount).applyForLoan(
    // //     owner,
    // //     duration,
    // //     transferAmount
    // //   )

    // //   await expect(credLink.connect(otherAccount).applyForLoan(
    // //     owner,
    // //     duration,
    // //     transferAmount
    // //   )).to.revertedWith("repay loan to be eligible for borrowing");


    // });

  })

  describe("Test applyForLoan function", function () {
    it("Should approve successfull", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend)

      
      const transferAmount = ethers.parseUnits("40", 18);
      const duration = 7;
      
      await credLink.connect(otherAccount).applyForLoan(
        owner,
        duration,
        transferAmount
      )

      expect(await credLink.connect(owner).approveBorrower(otherAccount)).to.emit(
        credLink,
        "BorrowerApproveSuccessful"
      ).withArgs(owner, otherAccount, transferAmount);


    });

  })

  describe("Test viewAvailableLoans function", function () {
    it("Should approve successfull", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);
      await token.connect(owner).transfer(otherAccount, amountToSend);
      await token.connect(otherAccount).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend);
      await credLink.connect(otherAccount).lenderDeposit(amountToSend);
      const [lender, amount] = await credLink.viewAvailableLoans()

      expect(lender[0]).to.eq(owner);
      expect(amount[0]).to.eq(amountToSend);
      expect(lender[1]).to.not.eq(owner)
      expect(lender[1]).to.eq(otherAccount)
      expect(amount[1]).to.eq(amountToSend);
    })

  })

  describe("Test for viewInterestedBorrowers", function() {
    it("Should return interested borrowers for a lender", async function () {
      const { credLink, owner, otherAccount,account1, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend)

      
      const transferAmount = ethers.parseUnits("40", 18);
      const duration = 7;
      await credLink.connect(otherAccount).applyForLoan(
        owner,
        duration,
        transferAmount
      );

      await credLink.connect(account1).applyForLoan(
        owner,
        duration,
        transferAmount
      );
      
      const interestedBorrowers = await credLink.connect(owner).viewInterestedBorrowers();
      expect(await interestedBorrowers.length).to.eq(2);



    });
  })


  describe("Test viewApproveBorrowers function", function () {
    it("Should return correct approved borrowers for a lender", async function () {
      const { credLink, owner, otherAccount, token } = await loadFixture(deployCredLink);

      // lender deposit processs
      const amountToSend = ethers.parseUnits("100", 18);

      await token.connect(owner).approve(credLink, amountToSend);

      await credLink.connect(owner).lenderDeposit(amountToSend)

      
      const transferAmount = ethers.parseUnits("40", 18);
      const duration = 7;
      
      await credLink.connect(otherAccount).applyForLoan(
        owner,
        duration,
        transferAmount
      )

      await credLink.connect(owner).approveBorrower(otherAccount);

      const approvedBorrower = await credLink.connect(owner).viewApproveBorrowers();
      

      expect(await approvedBorrower.length).to.eq(1);
    


    });

  })

});
