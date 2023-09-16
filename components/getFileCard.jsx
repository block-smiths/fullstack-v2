import React from 'react'

const getFileCard = () => {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="bg-slate-800 p-8 mb-52 ounded-lg shadow-md">
      <h1 className="text-white font-bold text-2xl mb-4">Get Documents</h1>
      <form>
        <div className="mb-4">
          <p
            htmlFor="recipient"
            className="block text-white font-bold font-medium"
          >
            Hash
          </p>
          <p className="block text-white font-medium">
            dhbcubuwcbuw
          </p>
        </div>

        <div className="mb-6">
          <p
            htmlFor="uploadDocument"
            className="block text-white font-medium"
          >
            Type
          </p>
          <p className="block text-white font-medium">PAN</p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleGet}
          >
            Get
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default getFileCard
