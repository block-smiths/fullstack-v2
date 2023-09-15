"use client";
import React from 'react';

const HomePage = () => {
  return (
    <div
      style={{
       
        position: 'relative',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
       <div className="bg-grey-600 py-4 px-6 flex justify-between items-center w-full mb-4">
       <div className="flex items-center justify-center w-full">
          <h1 className="text-5xl text-yellow-500 py-4 text-center font-bold ml-40 ">E-Vault</h1> {/* Adjusted margin-left (ml-4) */}
        </div>
        <select
          id="walletOptions"
          className="bg-yellow-500 font-bold text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
        >
          <option value="connectWallet" disabled selected>
            Connect Wallet
          </option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          {/* you can add your option as you need */}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 mt-1">
        <div className="max-w-xl w-full px-6 py-6 bg-slate-800 bg-opacity-70 rounded-md shadow-lg">
          <div className="mb-6">
            <label htmlFor="certificateType" className="block text-xl font-medium text-white">
              Certificate Type
            </label>
            <select
              id="certificateType"
              name="certificateType"
              className="mt-4 block w-full pl-3 pr-10 py-2 border border-gray-900 bg-white rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
                <option value="option5">Option 5</option>
                <option value="option5">Option 5</option>             
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="recipient" className="block text-xl font-medium text-white">
              Recipient
            </label>
            <input
              type="text"
              id="recipient"
              name="recipient"
              className="mt-4 p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-yellow-600 focus:border-yellow-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="certificateHash" className="block text-xl font-medium text-white">
              Hash for the Certificate
            </label>
            <input
              type="text"
              id="certificateHash"
              name="certificateHash"
              className="mt-4 p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-yellow-600 focus:border-yellow-600"
            />
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
            >
              Create Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
