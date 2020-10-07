if (process.env.NODE_ENV === 'development') {
  require("dotenv").config(); 
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
require('./database');

//Middlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/books', require('./routes/books'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});