
// import CoinIcon from "../assets/svg/Ellipse.svg"
const Transactions = (approveBorrower) => {

  return (
    <div className='flex flex-row align-middle justify-evenly text-white gap-8 mb-5'>
          <p className='font-semibold text-sm'>0x12r4598j...6HJ9</p>
          <div className='font-bold text-sm'>$132</div>
          <div className='font-normal text-sm'>1.5005</div>
          <div className='font-normal text-sm'><button onClick={approveBorrower("0x422da85a9D29d9888d33e5a6B5DaA27206bB592E")} className="rounded-3xl bg-[#584BFF] px-6 py-4">Approve</button></div>

          </div>
          )
}


export default Transactions


