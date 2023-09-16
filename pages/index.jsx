"use client";
import React, { useState } from 'react';
import { ConnectKitButton } from "connectkit"
import eas from '../utils/eas';
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { useEthersSigner } from '../utils/hooks';
import { useWalletClient } from 'wagmi';
import { fileToSha256Hex } from '../utils/sha256';

const HomePage = () => {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [type, setType] = useState(1);
  const [currentHash, setCurrentHash] = useState("");
  const { data: walletClient } = useWalletClient({ chainId: 11155111 })
  const signer = useEthersSigner(walletClient);
  const schemaEncoder = new SchemaEncoder("bytes32 hash, uint8 type");

  const schemaUID = "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7"

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation
    if (currentHash.length === 0 || recipient.length === 0) {
      alert('Please Fill All the Data');
      return;
    }

    console.log('Uploading Document...')
    await uploadDocument();

    console.log('Document Uploaded! View it at: ');
    console.log(`http://45.79.123.179/getfile/${currentHash}`)

    eas.connect(signer);
    const encodedData = schemaEncoder.encodeData([
      { name: "hash", value: currentHash, type: "bytes32" },
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

  const selectDocument = async (file) => {
    //Accept the Document from the User (DONE) => file
    //Generate IPFS CID from the Document (PENDING)
    //Use the Generated CID to AutoPopulate the certificateHash field (DUMMY)
    console.log('FILE => ', file);
    setFile(file);
    const generatedHash = await fileToSha256Hex(file)
    setCurrentHash(generatedHash);
    console.log('Generated FileHash is ', generatedHash);
  }

  const clearDocument = () => {
    setFile(undefined);
    setCurrentHash('');
    setUploaded(false);
  }



  const uploadDocument = async () => {
    if (file === undefined) {
      alert('Document Not Selected')
      return undefined;
    }
    const formData = new FormData();
    formData.append('file', file)

    setLoading(true);

    try {
      const response = await fetch(`http://45.79.123.179/savefile/${currentHash}`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
    setUploaded(true);
    return;
  }

  return loading ?

    <div class="flex h-screen">
      <div class="m-auto">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    : (
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
                value={recipient}
                onChange={(e) => {
                  setRecipient(e.target.value)
                }}
              />
            </div>
            <div className="mt-12">

              {
                (file === undefined) ? <div class="flex items-center justify-center">
                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">PDF, PNG, JPG, SVG etc)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" onChange={(e) => selectDocument(e.target.files?.[0])} />
                  </label>
                </div> : <p
                  class="text-md text-blue-500"
                  onClick={() => clearDocument()}
                >Document Selected (click to cancel)</p>
              }
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