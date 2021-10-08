/* eslint-disable */
const Transaction = require('./transactionModels');
//const objectId = require('mongoose').objectId;
const { sendTransactionDetails } = require('../utils/email');


exports.transactionDetails = async (req, res) =>{
    const TransactionDetails= new Transaction(req.body);
    TransactionDetails.save((err, TransactionDetails) =>{
        if(err){
            return res.json({
                message:"unable to add transaction details"
            })
        }
        return res.json({
            message: "Success",
            TransactionDetails
        })
    })
    const email = TransactionDetails.email;
    //console.log(email)
    const TransactionSend = await sendTransactionDetails(TransactionDetails, email);
}

exports.showTransactionDetails = async (req, res) => {
   let id = req.params._id;
   const transactions = await Transaction.find({ transaction: id });

   res.send({
       message: "Show data successfully",
       transactions
   })
}
