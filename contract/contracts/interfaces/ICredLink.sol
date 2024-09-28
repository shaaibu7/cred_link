// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


interface ICredLink {
    function lenderDeposit(uint _amount) external;

    function approveBorrower(address _borrowerToApprove) external;

    function applyForLoan(uint _loanId, uint _duration, uint _amount) external;

    function repayLoan(uint loanId) external;

    function viewInterestedBorrowers() external;

    function viewAvailableLoans() external;

    function viewApproveBorrowers() external;

    function openDispute() external;
}