import express from 'express';
import path from 'path';
import multer from 'multer';


const router = express.Router();

// @desc multer configuration
const storage = multer.diskStorage( {
  destination( req, file, cb ) {
// @desc null is because it's no error
    cb( null, 'uploads/' );
  },
  filename( req, file, cb ) {
    cb(
        null,
        `${ file.fieldname }-${ Date.now() }${ path.extname(
            file.originalname ) }`
    );
  }
} );

// @desc validation
function checkFileType( file, cb ) {
  const filetypes = /jpg|jpeg|png/;

  const extname = filetypes.test(
      path.extname( file.originalname ).toLowerCase() );
  const mimetype = filetypes.test( file.mimetype );

  if (extname && mimetype) {
    return cb( null, true );
  } else {
    cb( 'Images only in format and mime type jpg|jpeg|png' );
  }
}

const upload = multer( {
  storage,
  fileFilter: function( req, file, cb ) {
    checkFileType( file, cb );
  }
} );

// @route /uploads/
// @desc single means to upload only one file
router.post( '/', upload.single( 'image' ), ( req, res ) => {
  res.send( `${ req.file.path }` );
} );

export default router;








