
import { decodeAbiParameters } from 'viem'
import { getAttestationData } from '../../utils/gql'

export default async function handler(req, res) {
    if (req.method == "GET") {
        const { hash, recipient } = req.query;
        const data = await getAttestationData(recipient, "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7");
        const values = decodeAbiParameters(
            [
                { name: 'hash', type: 'bytes32' },
                { name: 'type', type: 'uint8' }
            ],
            data,
        )
        const verified = values[0] == hash;
        res.status(200).send({
            verified,
            data: verified ? data : null
        });
    }
}
