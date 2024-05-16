const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
    apiKey: TEST_API_KEY,
    network: Network.ETH_SEPOLIA,  // sepolia testnet
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
    // get the nonce    
    const nonce = await alchemy.core.getTransactionCount(
        wallet.address,
        'latest'
    );

    // create a transaction
    let transaction = {
        to: "0x035102c76A54F5AFD71273900c0232b75427c5F9",
        value: Utils.parseEther('0.001'), // 0.001 worth of ETH being sent
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('26', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 11155111, // sepolia testnet chain id
    };

    // sign the transaction
    let rawTransaction = await wallet.signTransaction(transaction);
    console.log('Raw tx: ', rawTransaction);

    // send the transaction
    let tx = await alchemy.core.sendTransaction(rawTransaction);

    // use this if you want to inspect the response data!
    console.log(tx);
    console.log(`https://sepolia.etherscan.io/tx/${tx.hash}`);
}

main();