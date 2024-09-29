// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./interfaces/IERC20.sol";
import "./lib/Errors.sol";
import "./lib/Events.sol";

contract CredLinkContract {
    address owner;
    address public tokenAddress;
    mapping (address => uint) availableLoans;
    mapping (address => address[]) interestedBorrowers;
    mapping (address => address[]) approvedBorrowers;

    address[] lenders;


    mapping(address => borrowerDetails) borrowerData;

    constructor(address _tokenAddress) {
        owner = msg.sender;
        tokenAddress = _tokenAddress;
    }
    
    struct borrowerDetails {
        uint duration;
        uint amount;
        bool hasBorrow;
    }

    

    // setter functions

    function lenderDeposit(uint _amount) external {
        require(_amount > 0, "cannot send zero token");
        uint lenderTokenBalance = IERC20Token(tokenAddress).balanceOf(msg.sender);

        if(_amount > lenderTokenBalance) {
            revert Errors.InsufficientBalance();
        }

        IERC20Token(tokenAddress).transferFrom(msg.sender, address(this), _amount);

        availableLoans[msg.sender] += _amount;
        lenders.push(msg.sender);

        emit Events.LenderDepositSuccessful(msg.sender, _amount);

    }

    function approveBorrower(address _borrowerToApprove) external {
        require(_borrowerToApprove != address(0), "cannot send to address zero");
        require(borrowerData[_borrowerToApprove].hasBorrow != true, "cannot borrow multiple times");

        uint borrowAmount = borrowerData[_borrowerToApprove].amount;
        

        if(availableLoans[msg.sender] >= borrowAmount) {
            availableLoans[msg.sender] -= borrowAmount;
            borrowerData[_borrowerToApprove].hasBorrow = true;
            approvedBorrowers[msg.sender].push(_borrowerToApprove);

            IERC20Token(tokenAddress).transferFrom(address(this), _borrowerToApprove, borrowAmount);
        }

        emit Events.BorrowerApproveSuccessful(msg.sender, _borrowerToApprove, borrowAmount);
 
    }

    function applyForLoan(address _lender, uint _duration, uint _amount) external {
        require(availableLoans[_lender] > _amount, "lender does not have sufficient funds");
        require(!borrowerData[msg.sender].hasBorrow, 'repay loan to be eligible for borrowing');
        require(availableLoans[_lender] > 0, 'Not Available');

        interestedBorrowers[_lender].push(msg.sender);
        // borrowerData[msg.sender].hasBorrow = true;

        emit Events.BorrowerApplySuccessful(_lender, msg.sender, _amount, _duration); 
    }

    function repayLoan(address _lender) external {
        require(_lender != address(0), "cannot send to address zero");
        require(IERC20Token(tokenAddress).balanceOf(msg.sender) >= borrowerData[msg.sender].amount , "insufficient balance");

        borrowerData[msg.sender].hasBorrow = false;
        
        IERC20Token(tokenAddress).transferFrom(msg.sender, _lender, borrowerData[msg.sender].amount);

        emit Events.RepaySuccessful(_lender, msg.sender, borrowerData[msg.sender].amount, block.timestamp);
    }


    // getter functions
    function viewInterestedBorrowers() external view returns(borrowerDetails[] memory){
        address[] memory interestedBorrowersdata = interestedBorrowers[msg.sender];
        borrowerDetails[] memory borrowersInfo = new borrowerDetails[](interestedBorrowersdata.length);
        for(uint j; j < interestedBorrowersdata.length; j++) {
            borrowersInfo[j] = borrowerData[interestedBorrowersdata[j]];
        }
        return borrowersInfo;
    }

    function viewAvailableLoans() external view returns(address[] memory, uint[] memory){
        uint numberOfLenders = lenders.length;
        uint[] memory lendersAmount = new uint[](numberOfLenders);
        for(uint j; j < lenders.length; j++) {
            lendersAmount[j] = availableLoans[lenders[j]];
        }
        return (lenders, lendersAmount);
    }

    function viewApproveBorrowers() external view returns(borrowerDetails[] memory){
        address[] memory approvedBorrowersdata = approvedBorrowers[msg.sender];
        borrowerDetails[] memory borrowersInfo = new borrowerDetails[](approvedBorrowersdata.length);
        for(uint j; j < approvedBorrowersdata.length; j++) {
            borrowersInfo[j] = borrowerData[approvedBorrowersdata[j]];
        }
        return borrowersInfo;
    }

    function getLenderBalance() external view returns(uint) {
        return availableLoans[msg.sender];
    }

    


}
