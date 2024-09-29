/* eslint-disable react/prop-types */
import  { useState } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContractABI from "../Files/cred_LinkAbi.json";

const ApplyForLoan = () => {
  const [lender, setLender] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const contractAddress = "0x422da85a9D29d9888d33e5a6B5DaA27206bB592E";
  // Function to apply for a loan
  const applyForLoan = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed!");
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];
      console.log(userAddress);
      
      // Connect to provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, ContractABI, signer);


      const tx = await contract.applyForLoan(lender, duration, ethers.utils.parseEther(amount));

    
      await tx.wait();

      toast.success("Loan application successful!");

    } catch (error) {
      console.error("Loan application error:", error);
      toast.error("Failed to apply for loan. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (lender && duration && amount) {
      applyForLoan();
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Apply for a Loan</h2>

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

        {/* Duration Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Duration (in days)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter duration in days"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Amount (ETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter amount in ETH"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-full py-3 font-semibold text-center hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply for Loan
          </button>
        </div>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ApplyForLoan;
