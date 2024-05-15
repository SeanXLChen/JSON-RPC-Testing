const axios = require('axios');

// grab the API key from the .env
require('dotenv').config();
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

async function getBlockNumber() {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber", // <-- TODO: fill in the method name
    });

    // axios has a data prop which is the response from the server
    // TOOD: use this console log to locate the block number
    console.log(response.data); 

    // TODO: return the block number
    return response.data.result;
}

getBlockNumber();