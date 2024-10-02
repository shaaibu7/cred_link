import icon from "../assets/Icon.svg"

const Guide = () => {
  return (
    <div>
          <div className="w-[1100px] h-[388px] mt-6 flex flex-row justify-between"> 
              <div className="w-64 h-72 flex flex-col justify-center items-center" >
                  <div className="w-28 h-24">
                  <img src={icon} alt="icon" />
                  </div>
                  <h2 className="text-2xl text-white">Connect your wallet</h2>
                  <p className="text-base text-center text-white"> connect your crypto wallet to start borrowing or lending securely. Supported wallets: MetaMask, WalletConnect, and more.</p>
              </div>
              <div className="w-64 h-72 flex flex-col justify-center items-center" >
                  <div className="w-28 h-24">
                  <img src={icon} alt="icon" />
                  </div>
                  <h2 className="text-2xl text-white">Borrow or Lend</h2>
                  <p className="text-base text-center text-white"> Choose to borrow funds or lend money easily and securely with just a few simple clicks today.</p>
              </div>
              <div className="w-64 h-72 flex flex-col justify-center items-center" >
                  <div className="w-28 h-24">
                  <img src={icon} alt="icon" />
                  </div>
                  <h2 className="text-2xl text-white">Receive and Repay</h2>
                  <p className="text-base text-center text-white"> Get your loan or start earning interest, then repay on flexible terms.</p>
              </div>
              
        </div>
    </div>
  )
}

export default Guide
