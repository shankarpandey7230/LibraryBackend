import multer from "multer";
import path from "path";

const __dirname = path.resolve();
const fpDestination = path.join(__dirname, "public/img");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // check if directory exist if not then create one
    !fs.existSync(fpDestination) &&
      fs.mkdirSync(fpDestination, { recursive: true });
    cb(null, fpDestination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    const filePath = uniqueSuffix + +"-" + file.originalname;

    cb(null, filePath);
  },
});

// filter and allow specific file only

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|jif|webp|/;
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedTypes.test(extName);
  const mimeType = allowedTypes.test(file.mimeType);
  if (isAllowedExt && mimeType) {
    cb(null, true);
  } else {
    cb(new Error(" Only jpeg|jpg|png|jif|webp| are allowed "), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
// end of multer
