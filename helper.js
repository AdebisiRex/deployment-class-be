const jwt = require("jsonwebtoken");
const handleError = (res, err) => {
    console.log(err)
  res.send({
    message: "There was an error",
    errCode: err?.code,
    errMessage: err?.message,
  });
};

const verifyToken = (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  if(!req.headers.authorization){
    res.status(400).send({ message: "Authorization required" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res.send({ message: "Invalid User" });
  }
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      res.send({ message: "User not authorized" });
    }
    next();
  });
  // if(!verified){
  // }

};

module.exports = { handleError, verifyToken };
