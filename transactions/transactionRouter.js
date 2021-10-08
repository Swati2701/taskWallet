/* eslint-disable */

const express = require('express');
const transactionController = require('../transactions/transactionController');

const router = express.Router();


router.post('/transactionDetails', transactionController.transactionDetails); 
router.get('/showTransactionDetails', transactionController.showTransactionDetails);

module.exports = router;
