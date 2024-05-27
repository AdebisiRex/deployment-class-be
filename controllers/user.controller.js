const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const { handleError } = require("../helper");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const form = new userModel({ ...userData });
    // await form.save();

    form.save((err, result) => {});
    res.send("user saved successfully");
  } catch (err) {
    handleError(res, err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1]
    // const secret = process.env.JWT_SECRET
    // const verify = jwt.verify(token, secret)
    const users = await userModel.find();

    res.send({ message: "Data Fetched Succeffully", users });
  } catch (err) {
    handleError(res, err);
  }
};

const getAllUsersByFirstName = async (req, res) => {
  try {
    console.log("Hello");
    const { firstName } = req.params;
    const users = await userModel.find({ firstName });

    res.send({ message: "Data Fetched Succeffully", users });
  } catch (err) {
    console.log(err.message);
    res.send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).send({ message: "user does not exist" });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: "1h" });

    console.log(token);
    res.send({ message: "Log in Successful", data: { user, token } });
  } catch (err) {
    handleError(res, err);
  }
};

const sendMail = (req, res) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        tyoe: "OAuth2",
        user: "adesina.roa@gmail.com",
        pass: "ggxqeubvjwbdoqng",
      },
    });

    let messageObj = {
      from: "Nerdshelves donotreply@nerdshelves.com ", // sender address
      to: "alabizakariyyah22@gmail.com", // list of receivers
      subject: "Hello From Node", // Subject line
      //   text: "Hello to me myself", // plain text body
      html: "<h1>message</h1> <p> Interesting things are happening </p>", // html body
    };

    transporter.sendMail(messageObj, (err, result)=>{
      if(err){
        console.log(err.message)
      }
      res.send("mail sent succesfully")
    })
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getAllUsersByFirstName,
  loginUser,
  sendMail,
};
