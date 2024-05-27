const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const { handleError } = require("../helper");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) throw Error("No file found");

    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
        if (err) {
          reject("there was an error");
        }
       console.log(result)
        res.send({ message: "upload successful", data: result.url });
        resolve(result);
      });
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { uploadImage };
