import multer, { diskStorage } from 'multer'
const storage = diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
        }
      })
      const validImgTypes = [
        "image/png" , "image/jpg", "image/jpeg", "image/svg+xml", "image/webp", "image/gif"
    ]
    const validVideoTypes = [
        "video/x-msvideo","video/mp4","video/x-flv","video/quicktime","video/x-ms-wmv","video/ogg"
    ]
    
    const validAudioTypes = [
        "audio/mpeg","audio/x-aiff","audio/mp4","audio/ogg","audio/vnd.wav",
    ]
    const uploadimage = multer({ storage: storage, fileFilter (req, file, cb) { 
        if (validImgTypes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error('invaild file type!'))
        }
    
    },limits: { fileSize: 1048576} })
    
    export {
        uploadimage,
    }