const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const {AppErr,appErr}=require('../../utils/appErr')
const generateToken=require('../../utils/generateToken')

//Registration
const registerUserCtrl = async (req, res,next) => {
  const { fullname, password, email } = req.body;
  try {
    //check if email exit
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr('User Aready exits',400))
      
    }
    // //check if the fields are empty
    // if (!email || !password || !fullname) {
    //   return res.json({ message: "Please Provideall Filed" });
    // }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "Success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (err) {
    next(appErr(err.message,500));
  }
};

//Login
const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if eamil exits
    const userFound = await User.findOne({ email });
    if (!userFound) {
      
      return next(appErr('invalid login Credentials',400))
    }
    //check for password is correct
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      
      res.json({ message: "invalid login Credentials" });
    }
    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound.id,
      token:generateToken(userFound.id),
    });
  } catch (err) {
    next(appErr(err.message,500));
  }
};

//Profile
const profileUserCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

//Delete User
const deleteUserCtrl = async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status:'success',
      data:null,
    })
    res.json({ msg: "Delete routes" });
  } catch (err) {
    next(appErr(err.message,500));
  }
};

//Update user
const updateUserCtrl = async (req, res,next) => {
  try {
    //Check if email exist
    if(req.body.email){
      const userFound=await User.findOne({email:req.body.email});
      if(userFound){
        return next(
          appErr('Email is taken or you already have this email',400));
      }
    }
   

    //check if the user is updating password
    if(req.body.password){
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //update the user
        const user=await User.findByIdAndUpdate(
          req.user,
          {
            password:hashedPassword,
          },
          {
            new:true,
            runValidators:true,

          }
        );
        //send the response
        return res.status(200).json({
          status:'success',
          data:user,
        })
    }
    const user=await User.findByIdAndUpdate(req.user,req.body,{
      new:true,
      runValidators:true,
    })
    //send the response
    res.status(200).json({
      status:'success',
      data:user,
    })
  } catch (err) {
    next(appErr(err.message,500));
  }
};

module.exports = {
  registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
