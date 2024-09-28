
import Guide from "./Guide";
const Home = () => {
   return (
     <div className="text-3xl font-extrabold items-center h-full  w-[100%]  flex flex-col mt-[10%]">
       <div className="w-[80%] flex flex-col justify-center align-middle items-center">
         <p className="text-xl leading-6 font-[] text-white">
           Empowering Financial Freedom, One Transaction at a Time
         </p>
         <h2 className="text-6xl text-center leading-[68px] font-bold text-white">
           Borrow or Lend <span className="text-[#3E8BFF]">Tokens</span> with
           ease and transparency
         </h2>
       </div>
       <div className="text-white flex justify-center align-middle flex-col items-center mt-7">
         <h2 className="text-sm text-white">Get Started</h2>
         <div className="mt-6">
           <button className="bg-[#3E8BFF] text-white rounded-[72px] text-xs p-4 font-normal w-40 h-13 text-center">Get A Loan</button>
           <button className="bg-[#3E8BFF] text-white rounded-[72px] text-xs p-4 font-normal w-40 h-13 text-center ml-3">Lend</button>
         </div>
       </div>

       <div className="flex flex-col justify-center align-middle items-center mt-12">
         <h2 className="text-white text-4xl font-bold">How it works</h2>
       <Guide/>
      </div>
     </div>
   );
  }
  
  export default Home