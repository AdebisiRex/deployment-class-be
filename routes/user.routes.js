const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getAllUsersByFirstName, loginUser, sendMail } = require("../controllers/user.controller");
const { verifyToken } = require("../helper");

router.post("/create", createUser);
router.post("/login", loginUser);
router.get('/',verifyToken, getAllUsers)
router.get('/send-mail', verifyToken, sendMail)
router.get('/:firstName', getAllUsersByFirstName)


module.exports = router;
