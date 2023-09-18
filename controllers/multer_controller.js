

const multer = require('multer');
const path = require('path');


// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Set up multer upload configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MB file size limit
  },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('image');

// Check file type function
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check the file extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check the MIME type
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Handle the image upload request
app.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      // File upload success
      res.status(200).json({ message: 'File uploaded successfully!' });
    }
  });
});


