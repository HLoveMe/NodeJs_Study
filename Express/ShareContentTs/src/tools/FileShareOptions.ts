import * as multer from "multer";

export default {
    limits: {
        fieldNameSize: 255,
        fileSize: 1024 * 1024 * 20
    },
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, req["app"].get("filePath"))
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname + '-' + Date.now())
        }
    })
}