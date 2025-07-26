import { unlink } from "fs";
import { resolve } from "path";

// actually deletes the file
export const deleteFile = (filePath) => {
  //   console.log(filePath);
  try {
    unlink(resolve(filePath), () => {});
  } catch (error) {
    console.log(error);
  }
};
// is it single file or array of files to be deleted

export const deleteUploadedFiles = (req) => {
  // single file use case
  if (req.file) {
    // console.log("delete the single file");

    // console.log("File path:", req.file.path); //
    deleteFile(req.file.path);

    return;
  }
  if (req.files) {
    req.files.map((f) => deleteFile(f.path));
  }
};
