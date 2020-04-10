import multer, { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import uuidV4 from 'uuid/v4';

export default multer({
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      const uniqueName = uuidV4();
      callback(null, `${uniqueName}${extname(file.originalname)}`);
    },
  }),
});
