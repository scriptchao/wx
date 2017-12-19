/**
 * Created by scriptchao on 2017/12/19.
 */
import express from 'express'
import crypto from 'crypto'

const router = express.Router();

const token = 'scriptchao2017';

router.get('/', (req, res) => {

    let {signature, timestamp, nonce, echostr} = req.query;

    console.log(signature, timestamp, nonce, echostr);

    let array = [token, timestamp, nonce];
    array.sort();

    let str = array.toString().replace(/,/g, "");

    let code = crypto.createHash("sha1").update(str).digest("hex");

    if (code === signature) {
        res.send(echostr)
    } else {
        res.send("error");
    }
});

export default router