const Account=require('../../model/Account');
const User=require('../../model/User');
const {appErr}=require('../../utils/appErr');

//create
const createAccountCtrl=async (req, res,next) => {
  const {name,accountType,initialBalance,transactions,notes}=req.body  
  try {
      //1. find the logged in user
      const userFound=await User.findById(req.user);
      if(!userFound){
        return next(appErr('User not Found',404));
      }

      //2. Create the account
      const account=await Account.create({
          name,
          initialBalance,
          accountType,
          notes,
          createdBy:req.user,
      })
      
      //3. push the account into users accounts field
      userFound.accounts.push(account._id);

      //4. resave the user
      await userFound.save();
      res.json({
        status:'success',
        data:account,
        
      });
    } catch (err) {
      next(appErr(err.message,500));
    }
}

//get single Account
const singleAccountCtrl=async (req, res) => {
    try {
      //find the id from params
      // console.log(req.params.id);
      const {id}=req.params;
      const account=await Account.findById(id).populate('transactions');
      res.json({
        status:'success',
        data:account,
      });
    } catch (err) {
      next(appErr(err.message,500));
    }
}

//get all account
const allAccountCtrl=async (req, res) => {
    try {
      const accounts=await Account.find().populate("transactions");
      res.json(accounts);
    } catch (err) {
      next(appErr(err.message,500));
    }
}

const deleteAccountCtrl=async (req, res,next) => {
    try {
      const {id}=req.params;
      await Account.findByIdAndDelete(id);
      res.status(200).json({
        status:'success',
        data:null,
      })
    } catch (err) {
      next(appErr(err.message,500));
    }
}

const updateAccountCtrl=async (req, res) => {
    try {
      const {id}=req.params;
      const account=await Account.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
      });

      res.json({
        status:'success',
        data:account,
      });
    } catch (err) {
      next(appErr(err.message,500));
    }
}

module.exports={
    createAccountCtrl,
    singleAccountCtrl,
    allAccountCtrl,
    deleteAccountCtrl,
    updateAccountCtrl,
}