"use client";
import React, { useState } from 'react';
import { ConnectKitButton } from "connectkit"
import eas from '../utils/eas';
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { useEthersSigner } from './hooks';
import { fileToSha256Hex } from '../utils/sha256';


const HomePage = () => {
  const [recipient, setRecipient] = useState("");
  const [file, setFile] = useState("");
  const [type, setType] = useState(1);
  const signer = useEthersSigner(11155111);
  const schemaEncoder = new SchemaEncoder("bytes32 hash, uint8 type");

  const schemaUID = "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7"

  const handleSubmit = async (e) => {
    e.preventDefault();
    eas.connect(signer);
    const hash = await fileToSha256Hex(file)
    const encodedData = schemaEncoder.encodeData([
      { name: "hash", value: hash, type: "bytes32" },
      { name: "type", value: type, type: "uint8" },
    ]);
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: recipient,
        expirationTime: 0,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
    const newAttestationUID = await tx.wait();
    console.log("Attestation UID: ", newAttestationUID);

  }

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
        <ConnectKitButton />
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
              defaultValue={"1"}
              onChange={(e) => {
                setType(Number(e.target.value))
              }}
            >
              <option value="1">Aadhar Card</option>
              <option value="2">PAN Card</option>
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
              onChange={(e) => {
                setRecipient(e.target.value)
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="certificateHash" className="block text-xl font-medium text-white">
              File for the Document
            </label>
            <input
              type="file"
              id="certificateHash"
              name="certificateHash"
              className="mt-4 p-2 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-yellow-600 focus:border-yellow-600"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
            />
          </div>
          <div className="mt-12">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600"
              onClick={handleSubmit}
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
