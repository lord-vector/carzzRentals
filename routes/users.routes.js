const express = require("express");
const UserRouter = express.Router();

const { registerUser, userLogin } = require("../controller/users");

UserRouter.get("/getUserDetails", (req, res) => {
  //to be implemented for the admin
});

UserRouter.post("/register", registerUser);

UserRouter.post("/login", userLogin);

module.exports = UserRouter;
