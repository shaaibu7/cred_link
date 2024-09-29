// import Notification from "../Components/Notification";
import vector1 from "../assets/Vector.svg";
import vector3 from "../assets/Vector (2).svg";
import ActiveLoan from "../Components/ActiveLoan";
import notice from "../assets/notice.svg";
// import TransactionB from "../Components/TransactionB";
import Lender from "../Components/Lender";
import ProvideLoanModal from "../Components/Modal";
import { Link } from "react-router-dom";


const LenderDashboard = () => {
  
  return (
    <div className="md:p-4">
  <section className="mt-10">
   
    <div className="flex items-center justify-between">
      <p className="text-white text-2xl md:text-3xl mx-auto ">Welcome Back!</p>
    </div>

   

    <div className="flex flex-col lg:flex-row gap-6 mt-6">
      <div className="border border-[#584BFF] rounded-xl w-full lg:w-[60%] p-4 flex flex-col lg:flex-row justify-between items-center">  
          <Link to="/approve">
          <button className="flex items-center gap-3 bg-[#584BFF] text-white px-4 py-6 rounded-3xl">
            Approve
            <span className="bg-white rounded-full p-2 ">
              <img src={notice} alt="notification" className="" />
            </span>
          </button>
          </Link>
            <button className="bg-[#584BFF] text-white flex px-4 py-6 items-center gap-2  rounded-3xl">
              view Aproved Borrowers<img src={vector1} alt="Limit Icon" />
            </button>
            <Link to="/borrowersDashboard">
            <button className="bg-[#584BFF] text-white px-4 py-6 flex items-center gap-2  rounded-3xl">
              Source for Loan <img src={vector3} alt="Withdraw Icon" />
            </button>
            </Link>
      </div>

    
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
    {/* <p className="text-3xl text-white ">Total Balances:<span>$200,0000</span></p> */}
    <div className="mt-8 flex justify-center">
    <ProvideLoanModal/>
    </div>
    <Lender />
  </section>
</div>

  );
};

export default LenderDashboard;
