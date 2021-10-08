/*eslint-disable */
const ethers = require('ethers');  
const crypto = require('crypto');

let id = crypto.randomBytes(32).toString('hex');
let privateKey = "0x"+id;
console.log("Private key don't share with anyone:", privateKey);

let wallet = new ethers.Wallet(privateKey);
console.log("Address: " + wallet.address);