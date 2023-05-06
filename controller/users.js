const userModel = require("../model/users.schema");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  let { userName, email, password, role } = req.body;
  console.log(userName, email, password, role);
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  console.log(password);
  //password is going to get stored in my database
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

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const data = await userModel.find({ email });
  try {
    if (email && password) {
      if (data.length > 0) {
        console.log(data[0].password);
        const compare = await bcrypt.compare(password, data[0].password);
        // if (data.length !== 0) {
        if (compare) {
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
    } else {
      throw "fields cannot be empty";
    }
  } catch (err) {
    res.send({ message: err });
  }
};

module.exports = { registerUser, userLogin };
