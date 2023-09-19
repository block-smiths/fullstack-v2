import React, { useEffect, useState } from "react";
import { ConnectKitButton } from "connectkit";
import FileCard from "../components/FileCard";
import { useAccount } from "wagmi";
import axios from "axios";

const Profile = () => {

  const { isConnected, address } = useAccount();
  const [_isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (isConnected) {
      axios.get("/api/getAttestations", {
        params: {
          recipient: address
        }
      }).then(res => {
        setData(res.data.values)
      })
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      setIsConnected(true);
    }
  }, [isConnected])

  const render = () => {
    if (data.length > 0) {
      return data.map((el, id) => {
        return (
          <FileCard
            key={id}
            recipient={address}
            hash={el[0]}
            type={el[1]}
          />
        )
      })
    } else {
      return (<div className="flex justify-center align-center">
        <div className="block text-white font-bold font-medium">No Documents Found</div>
      </div>)
    }
  }

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
      {_isConnected ? render() : (<div className="flex justify-center align-center">
        <div className="block text-white font-bold font-medium">No Documents Found</div>
      </div>)}
    </div>
  );
};

export default Profile;
