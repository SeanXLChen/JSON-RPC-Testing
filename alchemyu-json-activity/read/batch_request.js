require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
    // batch multiple requests into a single HTTP request
    const batch = addresses.map((address, index) => ({
        jsonrpc: "2.0",
        id: index + 1,  // start from 1
        method: "eth_getBalance",
        params: [address, "latest"]
    }));

    try {
        const response = await axios.post(url, batch);
        // use this if you want to inspect the response data!
        console.log(response.data);

        // return the total balance of all the addresses 
        const totalBalance = response.data.reduce((total, res) => {
            return total + parseInt(res.result, 16); // convert hex to decimal
        }, 0);

        console.log(totalBalance);
        return totalBalance;
    }
    
    catch (error) {
        console.error(error);
    }
}

module.exports = getTotalBalance;

const addresses = [
    '0x830389b854770e9102eb957379c6b70da4283d60',
    '0xef0613ab211cfb5eeb5a160b65303d6e927f3f85',
    '0x5311fce951684e46cefd804704a06c5133030dff',
    '0xe01c0bdc8f2a8a6220a4bed665ceeb1d2c716bcb',
    '0xf6c68965cdc903164284b482ef5dfdb640d9e0de'
];

getTotalBalance(addresses);