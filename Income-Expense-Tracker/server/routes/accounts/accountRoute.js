const express = require("express");
const {
  createAccountCtrl,
    singleAccountCtrl,
    allAccountCtrl,
    deleteAccountCtrl,
    updateAccountCtrl,
}=require('../../controllers/accounts/accountCtrl');
const isLogin=require('../../middlewares/isLogin')
const accountRouter = express.Router();

//Create account
accountRouter.post("/",isLogin,createAccountCtrl );

//Get one account details
accountRouter.get("/:id",singleAccountCtrl);

//get  All Account
accountRouter.get("/", allAccountCtrl);

//Delete Account details
accountRouter.delete("/:id", deleteAccountCtrl);

//Update Account Details
accountRouter.put("/:id", updateAccountCtrl);

module.exports = accountRouter;
