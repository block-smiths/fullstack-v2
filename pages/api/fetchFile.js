
import { verifyMessage } from "viem";
import axios from "axios";

export default async function handler(req, res) {

    if (req.method == "GET") {

        const { message, address, signature } = req.query;
        console.log(message, address, signature)
        const recovered = await verifyMessage({ message, address, signature });
        let file;
        if (recovered) {
            const res1 = await fetch("http://45.79.123.179/getfile/" + message);
            try {
                file = await axios.get(res1.url, { responseType: 'stream' })
                res.setHeader('Content-Type', file.headers['content-type']);
                res.setHeader('Content-Disposition', `attachment; filename="${file.headers['content-disposition']}"`);
                file.data.pipe(res);
            } catch (error) {
                console.log(error)
            }
        } else {
            res.status(200).send({
                verified: false,
                data: null
            });
        }
    }
}
