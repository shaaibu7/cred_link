// import BTC from "../assets/Btc.png";
import Txs from "./Txs";

const Lender = () => {
  
  return (
      <div className="border border-[#584BFF] rounded-xl w-[90%] h-[200px] flex flex-col justify-between p-4 mt-4 mx-1">
        <div className="flex justify-between *:  font-bold text-white">

    <div className="">
       <div className="w-[80%] flex justify-between font-bold text-white mt-4 mx-6">
          <p>Recent transaction</p>
          <p className="">View all transactions</p>
        </div>
      <div className="w-full border border-[#584BFF] rounded-xl h-[100px] flex flex-col justify-between  mx-4">
        <div className="flex flex-row justify-evenly text-white  m-2 ">
          <p className="flex-1 text-left">Team</p>
          <p className="flex-1 text-left">Transaction type</p>
          <p className="flex-1 text-left">Price</p>
          <p className="flex-1 text-left">24hrs Changes</p>
        </div>
        <Txs/>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Lender;
