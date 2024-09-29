/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BorrowersDashboard = ({ contractAddress, contractAbi }) => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  const fetchApprovedBorrowers = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      const approvedBorrowers = await contract.viewApproveBorrowers(); 
      setBorrowers(approvedBorrowers); 
      console.log(approvedBorrowers);
      
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching approved borrowers", error);
      toast.error("Failed to fetch borrowers. Please try again.");
      setLoading(false);
    }
  };

  
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then(() => fetchApprovedBorrowers())
        .catch(() => {
          toast.error("Please connect to MetaMask");
          setLoading(false);
        });
    } else {
      toast.error("MetaMask is not installed!");
      setLoading(false);
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>Approved Borrowers List</h2>
      
      <ToastContainer />
      {loading ? (
        <p>Loading borrowers...</p>
      ) : (
        <ul>
          {borrowers.length > 0 ? (
            borrowers.map((borrower, index) => (
              <li key={index}>
                <div>
                  <span>Borrower Address: {borrower}</span>
                </div>
              </li>
            ))
          ) : (
            <li>No approved borrowers found.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BorrowersDashboard;
