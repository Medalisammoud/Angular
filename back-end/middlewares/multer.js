const multer = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(" ").join("_");
    cb(null, Date.now() + name + '.jpg')
  }
})

const upload = multer({ storage })

module.exports = upload;