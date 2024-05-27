const bcrypt = require('bcryptjs')

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {type:String, required: true },
  lastName: String,
  email: {type:String,  unique: true, lowercase: true},
  age: {type:Number, min: [17, "You must be legal to access"], max: 65, required: true},
  dob: Date,
  sportingHouse: {type: String, enum : ['red', 'blue', 'green', "white"], required: true },
  isValid: {type: Boolean, default: false},
  password: {type: String, required: true},
  bestFriends: [String],
  createdAt: {type: Date, default: Date.now()}
});


let saltround = process.env.SALTROUND
userSchema.pre("save",async function(){
  const hash = await bcrypt.hash(this.password, saltround)
  this.password = hash  
})
const userModel = mongoose.model("user_data", userSchema);

module.exports = userModel;
