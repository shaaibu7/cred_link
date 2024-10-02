import MySvgIcon from "../assets/svg/logo.svg";
import Line from "../assets/svg/Line.svg";
import Metamask from "../assets/svg/metamask.svg";
// import { ethers } from "ethers";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Navbar = () => {
  // const navigate = useNavigate();

  const { connectors, connect } = useConnect();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      // navigate("/lenderDashboard");
    }
  }, [isConnected]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center pt-10 md:pt-14 p-5">
      <div className="w-full md:w-4/5 flex flex-row justify-between items-center">
        <Link to="/">
          <button className="w-48 h-8">
            <img src={MySvgIcon} alt="logo" className="w-full h-full" />
          </button>
        </Link>

        <div className="hidden md:block ">
          <img src={Line} alt="line image" />
        </div>

        {/* Metamask connect button */}

        {isConnected ? (
<<<<<<< HEAD
          <p className="">
=======
          <p className="text-white w-48 h-11 flex flex-row items-center justify-center rounded-3xl border-[#7AAFFF] border-2">
            <img src={Metamask}  className="w-6 h-6" />
>>>>>>> 2ee4ec359bd7973eb5ebd14b7b0c096f3828b046
            {address.slice(0, 5)}... {address.slice(-5)}
          </p>
        ) : (
          <button className="w-48 h-11 flex flex-row items-center justify-center rounded-3xl border-[#7AAFFF] border-2">
            <img src={Metamask} alt="metamask logo" className="w-6 h-6" />
            <h2
              onClick={() => {
                if (!connectors.length) {
                  toast.error("No wallet installed!");
                  return;
                }
                connect({
                  connector:
                    connectors.find(
                      (fd) => fd.name.toLowerCase() === "metamask"
                    ) ?? connectors[0],
                });
              }}
              className="text-sm ml-2 text-white"
            >
              Connect Wallet
            </h2>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
