import BTC from "../assets/Btc.png";

const Txs = () => {
    const imgStyle = {
        width: "40px",
        height: "40px",
        
    }
  return (
    <div className="p-3">
       <div className="flex items-center gap-4 text-white">
          <img src={BTC} style={imgStyle} alt="BTC Logo" />
          <div className="flex flex-row justify-evenly gap-[175px] items-center text-white">
  <p className="">BTC Bitcoin</p>
  <p className="">Loan</p>
  <p className="">$200</p>
  <p className="">44e25bc0ed840f97039of...eaf </p>
</div>

        </div>
    </div>
  )
}

export default Txs
