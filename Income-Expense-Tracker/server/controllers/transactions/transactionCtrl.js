const Account=require('../../model/Account');
const Transaction=require('../../model/Transaction');
const User=require('../../model/User');
const {appErr}=require('../../utils/appErr')

//Create
const createTransactionCtrl=async (req,res,next)=>{
    const {name,amount,notes,transactionType,category,account}=req.body;  
    try{
        //1.Find user
        const userFound=await User.findById(req.user);
        if(!userFound){
            return next(appErr('User not found',404))
        }
        //2. find the account
        const accountFound= await Account.findById(account);
        if(!accountFound){
            return next(appErr('Account not found',404))
        }
        //3. create the transaction
        const transaction=await Transaction.create({
            amount,
            notes,
            account,
            transactionType,
            category,
            name,
            createdBy:req.user,
        })
        //4. Push the transaction to the account
        accountFound.transactions.push(transaction._id)
        //5. resave the account
        await accountFound.save();

        res.json({
            status:'success',
            data:transaction,
        })
    }
    catch(err){
        next(appErr(err.message,500));
    }
}

//Get one
const oneTransactionCtrl=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const tran=await Transaction.findById(id);
        res.json({
            status:'success',
            data:tran,
        })
    }
    catch(err){
        next(appErr(err.message,500));
    }
}

//Get all
const allTransactionCtrl= async (req,res,next)=>{ 
    try{
        const trans=await Transaction.find();
        res.status(200).json({
            status:'success',
            data:trans,
        })
    }
    catch(err){
       next(appErr(err.message,500));
    }
}

//Delete 
const deleteTransactionCtrl=async (req,res,next)=>{
    try{
        const {id}=req.params;
         await Transaction.findByIdAndDelete(id);
        res.json({
            status:'success',
            data:null,

        })
    }
    catch(err){
        next(appErr(err.message,500));
    }
}

//Update
const updateTransactionCtrl=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const tran=await Transaction.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true,
        })
        res.json({
            status:'success',
            data:tran,
        })
    }
    catch(err){
        next(appErr(err.message,500));
    }
}

module.exports={
    createTransactionCtrl,
    oneTransactionCtrl,
    allTransactionCtrl,
    deleteTransactionCtrl,
    updateTransactionCtrl,
}