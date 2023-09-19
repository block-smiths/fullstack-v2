import axios from 'axios';
import React from 'react'
import { useWalletClient } from 'wagmi';

const FileCard = ({ hash, type, recipient }) => {
  const { data: walletClient } = useWalletClient({ chainId: 11155111 })
  const handleGet = async (e) => {
    e.preventDefault();
    const signature = await walletClient.signMessage({ message: hash });
    const res = await axios.get("/api/fetchFile", {
      params: {
        message: hash,
        address: recipient,
        signature: signature
      },
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipient}.pdf`;
    a.click();
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-800 p-8 mb-52 ounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <p
              htmlFor="recipient"
              className="block text-white font-bold font-medium"
            >
              Hash
            </p>
            <p className="block text-white font-medium">
              {hash}
            </p>
          </div>

          <div className="mb-6">
            <p
              htmlFor="uploadDocument"
              className="block text-white font-medium"
            >
              Type
            </p>
            <p className="block text-white font-medium">{type === 1 ? "Aadhar Card" : "PAN Card"}</p>

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

export default FileCard
