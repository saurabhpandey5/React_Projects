const express = require("express");
const {
  registerUserCtrl,
  loginUserCtrl,
  profileUserCtrl,
  deleteUserCtrl,
  updateUserCtrl
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const usersRouter = express.Router();

//Register
usersRouter.post("/register", registerUserCtrl);

//Login
usersRouter.post("/login", loginUserCtrl);

//Profile
usersRouter.get("/profile/", isLogin, profileUserCtrl);

//Delete
usersRouter.delete("/",isLogin, deleteUserCtrl);

//Update
usersRouter.put("/",isLogin, updateUserCtrl);

module.exports = usersRouter;
