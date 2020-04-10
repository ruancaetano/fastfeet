import File from '../models/File';

class FilesController {
  async create(req, res) {
    const file = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
    });

    return res.json(file);
  }
}

export default new FilesController();
