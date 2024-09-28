import MySvgIcon from "../assets/svg/logo.svg";
import Line from "../assets/svg/Line.svg";
import Metamask from "../assets/svg/metamask.svg";
import { ethers } from "ethers";
import { useNavigate } from 'react-router';
import { toast } from 'react-dom';


const Navbar = () => {
  const navigate = useNavigate();
  async function connectWallet () {
    if(window.ethereum){
      try {
        await window.ethereum.request({method: "eth_requestAccounts"});
        navigate('/LenderDAshboard');
        return new ethers.providers.Web3Provider(window.ethereum);

      } catch (err) {
        console.log("errooo:" + err);
      }
      
    }else{
      toast.error("error connecting Wallet")
    }
  }
   
  
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center pt-10 md:pt-14 p-5">
  <div className="w-full md:w-4/5 flex flex-row justify-between items-center">
    <div className="w-48 h-8">
      <img src={MySvgIcon} alt="logo" className="w-full h-full" />
    </div>
    
    <div className="hidden md:block">
      <img src={Line} alt="line image" />
    </div>

    {/* Metamask connect button */}
    <button className="w-48 h-11 flex flex-row items-center justify-center rounded-3xl border-[#7AAFFF] border-2">
      <img src={Metamask} alt="metamask logo" className="w-6 h-6" />
      <h2 onClick={connectWallet} className="text-sm ml-2 text-white">Connect Wallet</h2>
    </button>
  </div>
</div>

  );
};

export default Navbar;
