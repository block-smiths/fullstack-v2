import axios from "axios";

const axios = require("axios");

const endpoint = "https://sepolia.easscan.org/graphql";
const headers = {
  "content-type": "application/json",
};

export const getAttestationData = async (user, schema) => {
  const graphqlQuery = {
    operationName: "fetchAttestations",
    query: `query Attestations {
          attestations(
            where: { recipient:{
              contains: "${user}"
            },
            schemaId:{      contains:"${schema}"
            }
            }
          ) {
            data
          }
        }`,
    variables: {},
  };

  const response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  });

  console.log(response.data); // data
  console.log(response.errors); // errors if any

  return response.data;
};
