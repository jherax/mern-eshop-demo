import multer from 'multer';

import config from '../config/server.cfg';

/** @see https://www.npmjs.com/package/multer */
const storage = multer.diskStorage({
  destination: `.${config.app.images}`,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const uploadMiddleware = multer({storage});

export default uploadMiddleware;
