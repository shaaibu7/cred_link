import React from 'react'

const Borrow = () => {
  return (
    <div className='flex justify-center align-center'>
      <div className="p-4 w-80 text-white border border-gray-600 rounded-lg flex flex-col items-center text-center">
  <h2 className="text-xl font-semibold mb-2">Set Minimum Balance Requirement</h2>
  <p className="p-2">Total fiat balance</p>
  <h1 className="font-bold text-2xl mb-4">$20,000.00</h1>
  <div className="flex items-center mb-4">
    <label htmlFor="min-amount" className="mr-2">Min Amount:</label>
    <input
      type="text"
      id="min-amount"
      className="border border-gray-400 rounded-md p-1 text-black"
      placeholder="Enter amount"
    />
  </div>
  <hr className="border-gray-400 w-full mb-4" />
  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
    Borrow
  </button>
</div>

    </div>
  )
}

export default Borrow