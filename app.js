/* eslint-disable */

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./userModule/userRouter');
const transactionRouter = require('./transactions/transactionRouter');

app.use(express.json());
app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', transactionRouter);

module.exports = app;