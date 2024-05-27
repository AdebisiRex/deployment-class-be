const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json({ extended: true, limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.set("view engine", "ejs");
const { uploadImage } = require("./controllers/upload.controller");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//-------------------------------------------------




// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "zaka",
//     format: async (req, file) => "png", // supports promises as well
//     public_id: (req, file) => Date.now() + "-" + file.originalname,
//   },
// });

// const upload = multer();

//----------------------------------------------

const PORT = process.env.PORT;
const MONGO_DB = process.env.MONGO_CONNECT;

const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.render("index");
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({storage: storage});
app.post("/upload-image", upload.single("file"), uploadImage);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_DB);
    console.log("App is running on port:", PORT);
  } catch (err) {
    console.log(err);
  }
});
