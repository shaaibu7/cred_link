import React from 'react';
import ActiveLoan from './ActiveLoan';
// import RepayLoan from './RepayLoan';

const UpdateBalance = () => {
  return (
    <div className='h-screen w-[95%] justify-center align-center'>
      
      <div className="flex justify-between text-white mt-2">
          <p>Address</p>
          <p>Amount</p>
          <p>Due Date</p>
        </div>
        <hr className="text-white mt-4" />
      <ActiveLoan />
      
      {/* <RepayLoan/> */}
    </div>
  )
}

export default UpdateBalance