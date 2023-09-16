
import axios from "axios";

const endpoint = "https://sepolia.easscan.org/graphql";

// Set your CORS-related options here
const axiosConfig = {
  withCredentials: true, // This allows cookies to be sent with the request (if your server requires it)
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAttestationData = async (user, schema) => {
  const graphqlQuery = {
    "query": " query Attestations($user:String,$schema:String) {  attestations(    where: { recipient:{ contains: $user  }, schemaId:{      contains:$schema  }   }  ) {    data }}",
    "variables": {
      "user": "0xdA144e89f2fe1EA7f48b731054B62105992329Ab",
      "schema": "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7"
    }
  };

  try {
    const response = await axios.post(endpoint, graphqlQuery, axiosConfig);
    return response.data.data.attestations[0].data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Handle the error as needed in your application
  }
};
