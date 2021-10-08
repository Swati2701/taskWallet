/* eslint-disable */
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   transactionHash: {
        type: String,
        trim: true,
        required: true,
    },
    status:{
        type: String,
        required: true
    },
    block:{
        type: String,
    },
    blockHash:{
        type: String,
        required: true
    },
    from: {
        type: String,
        trim: true,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Transaction", transactionSchema);

