
import { getAttestationData } from '../../utils/gql'
import { decodeAbiParameters } from "viem"

export default async function handler(req, res) {
    if (req.method == "GET") {
        const { hash, recipient } = req.query;
        const data = await getAttestationData(recipient, "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7");
        let verified = false;
        for (const attestation of data) {
            const values = decodeAbiParameters(
                [
                    { name: 'hash', type: 'bytes32' },
                    { name: 'type', type: 'uint8' }
                ],
                attestation.data,
            )
            if (values[0] == hash) {
                verified = true;
                break;
            }
        }

        res.status(200).send({
            verified,
            data: verified ? hash : null
        });
    }
}
