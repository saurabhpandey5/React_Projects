const express = require("express");
const {
  createTransactionCtrl,
  oneTransactionCtrl,
  allTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../controllers/transactions/transactionCtrl");
const isLogin=require('../../middlewares/isLogin')
const transactionsRouter = express.Router();

//create Transactions
transactionsRouter.post("/",isLogin,createTransactionCtrl);

//Get One transactions
transactionsRouter.get("/:id",oneTransactionCtrl);

//Get All transactions
transactionsRouter.get("/",allTransactionCtrl);

//Delete transactions
transactionsRouter.delete("/:id",deleteTransactionCtrl);

//Update the Transactions
transactionsRouter.put("/:id",updateTransactionCtrl);

module.exports = transactionsRouter;
