# CREDLINK: Decentralized P2P Credit Financing for SMEs 

  

## Overview 

  

**CREDLINK** is a decentralized peer-to-peer (P2P) credit financing platform designed to connect small and medium enterprises (SMEs) with lenders. Built as part of a hackathon project, CREDLINK leverages blockchain technology to ensure transparent, secure, and trustless credit transactions between borrowers and lenders. The platform operates via smart contracts to enable seamless credit provision and repayment while implementing safeguards to protect both parties. 

  

### Key Entities 

1. **Lender**: Provides liquidity and approves borrower applications. 

2. **Borrower**: SMEs seeking credit with a verifiable credit score. 

3. **Smart Contract**: Acts as an escrow to ensure smooth and secure transactions, manage borrower ratings, handle payments, and settle disputes. 

  

## Core Features 

  

### Lender Responsibilities: 

- **Liquidity Provision**: Lenders can provide liquidity by depositing funds into the platform. 

- **Borrower Approval**: Lenders have access to borrower applications and can approve credit for SMEs they find creditworthy. 

- **Dispute Resolution**: Lenders have the ability to open disputes in case of any issues regarding repayment or borrower behavior. 

  

### Borrower Responsibilities: 

- **Credit Application**: Borrowers can apply for loans via the platform, with their credit history and score being taken into account for approval. 

- **Creditworthiness**: Borrowers must maintain a good credit score for future borrowing opportunities. 

- **Loan Repayment**: Borrowers are required to repay loans according to the terms agreed upon with the lender. 

  

### Smart Contract (Escrow) Functions: 

- **Borrower Rating**: The smart contract tracks and updates borrower ratings based on their repayment behavior. 

- **Repayment Management**: Manages the entire loan repayment process, ensuring that funds are transferred from the borrower to the lender securely and on time. 

- **Dispute Settlement**: The contract handles disputes by mediating between lenders and borrowers based on predefined conditions. 

- **Flagging Borrowers**: It flags borrowers with poor repayment behavior, reducing their chances of receiving future credit. 

  

## How It Works 

1. **Lender Deposits Funds**: Lenders provide liquidity to the platform, which is held in a pool. 

2. **Borrower Application**: Borrowers apply for credit by submitting a loan request, backed by their credit score. 

3. **Approval**: Lenders review borrower applications and choose to approve or reject them based on creditworthiness. 

4. **Loan Agreement**: Upon approval, the smart contract facilitates the loan transfer from lender to borrower, securing the funds in escrow. 

5. **Repayment**: Borrowers repay their loans according to the schedule, with the contract automatically handling the repayments and updating borrower ratings. 

6. **Dispute Resolution**: If any issues arise, lenders can open a dispute, which the smart contract mediates based on preset conditions. 

  

## Technology Stack 

- **Smart Contracts**: Built on Ethereum , utilizing Solidity. 

- **Frontend**: Built with React Js. 

-***Integration**: ethers js. 

 

- **Decentralized Finance (DeFi)**: CREDLINK operates fully on the blockchain, making use of decentralized finance principles for transparency and security. 

   

## Conclusion 

CREDLINK aims to provide a decentralized, transparent, and trustless platform that bridges the gap between SME borrowers and lenders, ensuring fairness, security, and accountability in every transaction. 

  

### Future Work 

- Implementation of more complex credit scoring algorithms. 

- Adding a more comprehensive dispute resolution mechanism. 

- Integration of other blockchain networks for multi-chain support. 

- Verify borrowers' legitimacy and claims without revealing their identities using Zk-pass 

  

**Note**: This is an MVP developed for a hackathon, and future enhancements are expected to improve functionality and scalability. 