const userModel = require("../model/users.schema");

const registerUser = (req, res) => {
  const { userName, email, password, role } = req.body;
  console.log(userName, email, password, role);
  const userObj = {
    user_name: userName,
    password: password,
    email: email,
    role: role,
  };
  //checks if email already present, if no then it saves all the data if yes it wont save and send response only
  userModel.find({ email }).then((data) => {
    if (data.length === 0) {
      //method to register user in Mongo DB
      userModel(userObj)
        .save()
        .then((data) =>
          res.send({ message: "user successfully registered", data })
        )
        .catch((err) =>
          res.send({ message: "registration incomplete due to", err })
        );
    } else {
      res.json({
        message: `${email} user already exist, please login to continue`,
      });
    }
  });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;
  userModel
    .find({ email })
    .then((data) => {
      if (data.length !== 0) {
        if (data.password === password) {
          res.send({
            message: `login successfull`,
          });
          console.log(data);
        } else {
          res.send({
            message: `login unsuccessfull, please check the password`,
          });
          console.log(data);
        }
      } else {
        res.send({
          message: "user doesn't exist, please register to continue",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { registerUser, userLogin };
