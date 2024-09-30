import React, { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RepayLoan = ({ contractAddress, contractAbi, tokenAddress, tokenAbi }) => {
  const [lender, setLender] = useState("");

  // Function to repay loan
  const repayLoan = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed!");
      return;
    }

    try {
      // Request MetaMask account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];

      // Connect to provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instances
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

      // Fetch the amount borrower owes (assuming you have an amount on the frontend or need to fetch)
      const amountOwed = await contract.borrowerData(userAddress);
      const amount = amountOwed.amount; // Assuming amount is stored in the borrowerData struct

      // Approve the token transfer
      const approveTx = await tokenContract.approve(contractAddress, amount);
      await approveTx.wait();

      // Call the repayLoan function on the smart contract
      const repayTx = await contract.repayLoan(lender);
      await repayTx.wait();

      toast.success("Loan repaid successfully!");

    } catch (error) {
      console.error("Loan repayment error:", error);
      toast.error("Failed to repay loan. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (lender) {
      repayLoan();
    } else {
      toast.error("Please enter the lender's address.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Repay Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lender Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Lender Address</label>
          <input
            type="text"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0x..."
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-full py-3 font-semibold text-center hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Repay Loan
          </button>
        </div>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RepayLoan;