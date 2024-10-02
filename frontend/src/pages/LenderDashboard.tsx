// import Notification from "../Components/Notification";
import vector1 from "../assets/Vector.svg";
import vector3 from "../assets/Vector (2).svg";
import ProvideLoanModal from "../Components/Modal";
import { Link } from "react-router-dom";

const LenderDashboard = () => {
  return (
    <div className="md:p-4">
      <section className="mt-10 h-[100vh]">
        <div className="flex items-center justify-between">
          <p className="text-white text-2xl md:text-3xl mx-auto ">
            Welcome Back!
          </p>
        </div>
        <div className="border border-[#584BFF] rounded-xl w-full mt-10 lg:w-[96vw] h-[400px] mx-auto   flex justify-evenly items-center">
          <div className="flex flex-col justify-center items-center space-y-32">
            <Link to="/approve">
              <button className="flex text-xl font-semibold items-center justify-center w-[200px] h-[100px] gap-3 bg-[#584BFF] text-white px-4 py-6 rounded-3xl">
                Approved Loans
                <img src={vector1} alt="Limit Icon" />
              </button>
            </Link>
            <Link to="/applyloan">
              <button className="bg-[#584BFF] w-[200px] text-white px-4 py-6 h-[100px] flex items-center gap-2  rounded-3xl text-xl font-semibold">
                Apply for Loan <img src={vector3} alt="Withdraw Icon" />
              </button>
            </Link>
          </div>
          <ProvideLoanModal />
        </div>
      </section>
    </div>
  );
};

export default LenderDashboard;
