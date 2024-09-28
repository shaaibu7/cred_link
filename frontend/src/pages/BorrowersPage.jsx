import BorrowersFrame1 from "../Components/BorrowersFrame1"
import Notification from "../Components/Notification"
const BorrowersPage = () => {
  return (
    <div className="p-4">
  <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-[85%] sm:ml-14 mt-6">
    {/* Welcome Back Text */}
    <p className="text-xl sm:text-3xl text-white font-bold text-center sm:text-left mb-4 sm:mb-0">
      Welcome back!
    </p>

    {/* Notification Component */}
    <Notification />
  </div>

  {/* Borrower's Frame */}
  <BorrowersFrame1 />
</div>

  )
}

export default BorrowersPage
