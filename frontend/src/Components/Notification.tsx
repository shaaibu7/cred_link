import bell from "../assets/Bell .svg";

const Notification = () => {
  return (
    <div className="p-4">
    <button className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-white rounded-3xl border border-[#584BFF] px-2 sm:px-4 py-1 sm:py-2">
      <img src={bell} alt="bell" className="w-4 sm:w-5 md:w-6" />
      <span>15</span>
    </button>
  </div>
  
  )
}

export default Notification