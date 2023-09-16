import { AbiCoder } from 'ethers/lib/utils';
import { getAttestationData } from '../../utils/getAttestationData'

export default async function handler(req, res) {
    if (req.method == "GET") {
        const { hash, recipient } = req.query;
        console.log(hash, recipient)
        const data = await getAttestationData(recipient, "0x600938ba870eb8250c8f2e04c66f3f8ec554ff508000965ee6ded73bd1ed53d7");
        console.log(data)
        const abi = new AbiCoder();
        res.status(200).send({
            data,
            hash: hash
        });
        // const decoded = abi.decode(["bytes"], data.data.attestations[0].data);
    }
}
