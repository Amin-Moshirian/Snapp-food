import multer from "multer"
import path from "path"
import { uploadFilePath } from "./utils"

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFilePath());
  },
  filename: function (req, file, cb): void {
    const type: string = path.extname(file.originalname);
    cb(null, Date.now() + type);
  }
});

const upload: multer.Multer = multer({ storage: storage });


export default upload;