import axios from "axios";


const endpoint = "https://sepolia.easscan.org/graphql";
const headers = {
  "content-type": "application/json",
};
export const getAttestationData = async (user, schema) => {
  const graphqlQuery = {
    operationName: "fetchAttestations",
    query: `
    query Attestations($user:String,$schema:String) {
  attestations(
    where: { recipient:{
      contains: $user
    },
    schemaId:{      contains:$schema
    }
    }
  ) {
    data
  }
}`,
    variables: {
      user,
      schema,
    },
  };

  try {
    const response = await axios({
      url: endpoint,
      method: "post",
      headers: headers,
      data: graphqlQuery,
    });

    console.log(response.data); // data
    console.log(response.errors); // errors if any

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Handle the error as needed in your application
  }
};
