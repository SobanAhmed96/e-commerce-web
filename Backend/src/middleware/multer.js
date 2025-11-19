import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // save to /public/images
  },
  filename: function (req, file, cb) {
    // unique filename: timestamp + originalname
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
