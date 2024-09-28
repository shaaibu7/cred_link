import Notification from "../Components/Notification";
import vector1 from "../assets/Vector.svg";
// import vector2 from "../assets/Vector (1).svg";
import vector3 from "../assets/Vector (2).svg";
import ActiveLoan from "../Components/ActiveLoan";
import notice from "../assets/notice.svg";
import TransactionB from "../Components/TransactionB";
import Lender from "../Components/Lender";
import ProvideLoanModal from "../Components/Modal";
import { Link } from "react-router-dom";

const LenderDashboard = () => {
  
  return (
    <div className="md:p-4">
  <section className="mt-10">
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <p className="text-white text-2xl md:text-3xl">Welcome Back!</p>
      <Notification />
    </div>

    {/* Main Content Section */}
    <div className="flex flex-col lg:flex-row gap-6 mt-6">

      {/* Left Side - Loan Overview */}
      <div className="border border-[#584BFF] rounded-xl w-full lg:w-[65%] p-4">  {/* Adjusted width */}
        
        {/* Loan Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button className="flex border border-[#584BFF] rounded-3xl gap-2 px-4 py-2">
            <span className="text-[#584BFF]">Active Loans:</span>
            <p className="text-white">70%</p>
          </button>
          <button className="flex border border-[#584BFF] rounded-3xl gap-2 px-4 py-2">
            <span className="text-[#584BFF]">Loans Repayment:</span>
            <p className="text-white">90%</p>
          </button>
          <button className="flex border border-[#584BFF] rounded-3xl gap-2 px-4 py-2">
            <span className="text-[#584BFF]">Total Loans Disbursed:</span>
            <p className="text-white">$200,000</p>
          </button>
          <button className="flex items-center gap-3 bg-[#584BFF] text-white px-4 py-2 rounded-3xl">
            Request
            <span className="bg-white rounded-full p-2 ">
              <img src={notice} alt="notification" className="" />
            </span>
          </button>
        </div>
            <p className="text-white mt-2">Total fiat balance</p>

        {/* Total Balance and Buttons */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6">
          <div className="text-center lg:text-left">
            <p className="text-white text-4xl">$20,000.00</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
            <button className="bg-[#584BFF] text-white flex items-center gap-2 px-4 py-2 rounded-3xl">
              Define Loan Limit <img src={vector1} alt="Limit Icon" />
            </button>
            <ProvideLoanModal />
            <Link to="/borrowersDashboard">
            <button className="bg-[#584BFF] text-white flex items-center gap-2 px-4 py-2 rounded-3xl">
              Source for Loan <img src={vector3} alt="Withdraw Icon" />
            </button>
            </Link>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <TransactionB />
          <TransactionB />
          <TransactionB />
          <button className="border-2 border-dotted border-[#584BFF] text-white px-6 py-2 mt-4 sm:mt-0 rounded-xl">
            +Add Currency
          </button>
        </div>
      </div>

      {/* Right Side - Active Loans */}
      <div className="border border-[#584BFF] rounded-xl w-full lg:w-[35%] p-4">  {/* Adjusted width */}
        <div className="flex justify-between text-white">
          <p>Active Loans</p>
          <p>See All</p>
        </div>
        <div className="flex justify-between text-white mt-2">
          <p>Address</p>
          <p>Amount</p>
          <p>Due Date</p>
        </div>
        <hr className="text-white mt-4" />
        <ActiveLoan />
      </div>
    </div>

    <Lender />
  </section>
</div>

  );
};

export default LenderDashboard;
