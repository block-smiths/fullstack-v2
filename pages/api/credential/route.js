import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const eas = new EAS(EASContractAddress);
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/dSbD-bv903PeeiUx0qTNLS4hfRQ_sxGC"
);
eas.connect(provider);

export default async function handler(req, res) {
  const { uid, signature } = await req.body;
  const attestation = await eas.getAttestation(uid);
  const signer = ethers.utils.verifyMessage(uid, signature);
  const status = signer === attestation.recipient
  res.status(200).send({
    signer,
    status
  })
}
