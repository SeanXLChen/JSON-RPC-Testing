require('dotenv').config();
const {ALCHEMY_URL} = process.env;

const axios = require('axios');

//URL provided in your Alchemy.com dashboard
const url = process.env.ALCHEMY_URL;

axios.post(url, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", // block 46147
    "latest"  // retrieve the full transaction object in transactions array
  ]
}).then((response) => {
  console.log(response.data.result);
});