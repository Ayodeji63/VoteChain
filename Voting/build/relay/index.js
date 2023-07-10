'use strict';

var require$$0 = require('ethers');
var require$$1 = require('defender-relay-client/lib/ethers');

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

/**
 * ABI of the MinimalForwarder contract
 */

const ForwarderAbi$1 = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MinimalForwarder.ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"execute","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MinimalForwarder.ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}];

var forwarder = {
  ForwarderAbi: ForwarderAbi$1
};

var MinimalForwarder="0xdFF5C4d7c01D2cB19F3839CbcC7De4621D942db7";var VoteChain="0xf7087e54Ef60015026c0bdbdD6FeA73bc6f65482";var ASBT="0x5244E24d97330eBa0A4CB49eD314a1c0D9d0e332";var PSBT="0xAeBC2C7A7FE8bD8274c119cBd78906b4238C6475";var LSBT="0x81DCb8F9C8D5197dc2F3718b5821017E953A195f";var require$$3 = {MinimalForwarder:MinimalForwarder,VoteChain:VoteChain,ASBT:ASBT,PSBT:PSBT,LSBT:LSBT};

const ethers = require$$0;
const {
    DefenderRelaySigner,
    DefenderRelayProvider,
} = require$$1;

const { ForwarderAbi } = forwarder;
const ForwarderAddress = require$$3.MinimalForwarder;

async function relay(forwarder, request, signature, whitelist) {
    // Decide if we want to relay this request based on a whitelist
    const accepts = !whitelist || whitelist.includes(request.to);
    if (!accepts) throw new Error(`Rejected request to ${request.to}`)

    // Validate request on the forwarder contract
    const valid = await forwarder.verify(request, signature);
    if (!valid) throw new Error(`Invalid request`)

    // Send meta-tx through relayer to the forwarder contract
    const gasLimit = (parseInt(request.gas) + 50000).toString();
    return await forwarder.execute(request, signature, { gasLimit })
}

async function handler(event) {
    // Parse webhook payload
    if (!event.request || !event.request.body)
        throw new Error(`Missing payload`)
    const { request, signature } = event.request.body;
    console.log(`Relaying`, request);

    // Initialize Relayer provider and signer, and forwarder contract
    const credentials = { ...event };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, {
        speed: "fast",
    });
    const forwarder = new ethers.Contract(
        ForwarderAddress,
        ForwarderAbi,
        signer
    );

    // Relay transaction!
    const tx = await relay(forwarder, request, signature);
    console.log(`Sent meta-tx: ${tx.hash}`);
    return { txHash: tx.hash }
}

var relay_1 = {
    handler,
    relay,
};

var index = /*@__PURE__*/getDefaultExportFromCjs(relay_1);

module.exports = index;
