require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalTransactions(blockNumber) {
    const response = await axios.post(url, {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBlockTransactionCountByNumber",
        params: [
            blockNumber
        ], 
    });
    
    // use this if you want to inspect the response data!
    console.log(response.data);

    // return the total number of transactions in the block
    return  response.data.result;
}

getTotalTransactions('0x' + (16642379).toString(16));

module.exports = getTotalTransactions;