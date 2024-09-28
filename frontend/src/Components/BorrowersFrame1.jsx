import Transactions from "./Transactions";
import metamask from "../assets/svg/metamask.svg";
import TransactionB from "./TransactionB";
import Lender from "./Lender";
import { useForm } from "react-hook-form";



const BorrowersFrame1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full h-full flex flex-col justify-center py-16">
      <div className="flex flex-col sm:flex-row justify-between w-[90%] space-y-8 sm:space-y-0 sm:space-x-8">
    
        <div className="w-full sm:w-[400px] h-auto sm:h-[435px] border border-white flex flex-col items-center rounded-2xl p-4 md:ml-20">
          <div className="w-full sm:w-80 h-11 flex justify-center items-center border border-white rounded-3xl mt-6 sm:mt-12">
            <p className="text-white text-center">Loan Repayment: 90%</p>
          </div>
          <div className="w-full sm:w-80 mt-6">
            <div className="border-b pb-4">
              <p className="text-xs font-normal text-white mt-4 text-center">
                Debt
              </p>
              <h2 className="text-3xl sm:text-4xl text-white font-bold text-center">
                $3,000.00
              </h2>
            </div>
          </div>

          {/* Transaction Button */}
          <div className="mt-6">
            <TransactionB />
          </div>
        </div>

        {/* Second Frame */}
        <div className="w-full sm:w-96 h-auto sm:h-[435px] border border-white p-5 rounded-2xl flex flex-col">
          <p className="text-white mb-6">Available for loan</p>
          <div className="space-y-4">
            <Transactions />
            <Transactions />
            <Transactions />
            <Transactions />
          </div>
        </div>

        {/* Third Frame */}
        <div className="w-full sm:w-96 h-auto sm:h-[435px] border border-white rounded-2xl p-5 flex flex-col items-center">
          <div className="w-80 mt-2">
            <div className="h-32 text-white flex flex-col items-center">
              <p className="text-sm mb-2 font-normal">Quick Loans</p>
              <div className="w-24 h-24 border rounded-full flex justify-center items-center">
                <img src={metamask} alt="MetaMask" className="w-[80%]" />
              </div>
              <p>0x12r4598j...6HJ9</p>
            </div>

            <form className="flex flex-col"onSubmit={handleSubmit(onsubmit)}> 
              <div className="">
                <label className="block text-sm font-medium text-white">
                  Amount:
                </label>
                <input
                  type="text"
                  {...register("amount", { required: "Amount is required" })}
                  className={`block w-full border rounded-md p-2 ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="">
                <label className="block text-sm font-medium text-white">
                  Address:
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className={`block w-full border rounded-md p-2 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="">
                <label className="block text-sm font-medium text-white">
                  Duration:
                </label>
                <input
                  type="text"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  className={`block w-full border rounded-md p-2 ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.duration && (
                  <p className="text-red-500 text-xs">
                    {errors.duration.message}
                  </p>
                )}
              </div>
    
              <button
                className="  border bg-[#584BFF] text-white rounded-3xl py-2 w-3/4 flex items-center justify-center mx-auto mt-1 px-3"
                type="submit"
              >
                Borrow
              </button>
            </form>
          </div>
        </div>
      </div>
      <Lender />
    </div>
  );
};

export default BorrowersFrame1;
