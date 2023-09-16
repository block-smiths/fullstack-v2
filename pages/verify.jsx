import React from 'react';
import { ConnectKitButton } from "connectkit"

const VerifyPage = () => {
  return (
    <div>
      <div className="bg-grey-600 py-4 px-6 flex justify-between items-center w-full mb-4">
        <div className="flex items-center justify-center w-full">
          <h1 className="text-5xl text-yellow-500 py-4 text-center font-bold ml-40">
            E-Vault
          </h1>
        </div>

        <ConnectKitButton />
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="bg-slate-800 p-8 mb-52 ounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="recipient" className="block text-white font-bold font-medium">
                Recipient's Address
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipient's address"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="uploadDocument" className="block text-white font-medium">
                Upload Document
              </label>
              <input
                type="file"
                id="uploadDocument"
                name="uploadDocument"
                className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf, .doc, .docx"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;