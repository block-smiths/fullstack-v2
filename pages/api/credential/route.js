import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const eas = new EAS(EASContractAddress);
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/dSbD-bv903PeeiUx0qTNLS4hfRQ_sxGC"
);
eas.connect(provider);

export async function POST(req) {
  const { uid, signature } = await req.json();
  const attestation = await eas.getAttestation(uid);
  const signer = ethers.utils.recoverAddress(attestation.data, signature);
  const hash = ethers.utils.keccak256(signer);
  console.log(signer);
  console.log("attestation", attestation);
  return NextResponse.json(
    { status: "ok", hash },
    {
      status: 200,
    }
  );
}
