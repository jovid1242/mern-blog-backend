const ApiError = require("../exceptions/apiError");
const path = require("path");
const uuid = require("uuid");

class FileController {
  async create(req, res, next) {
    try {
      let file = req.files.image;
      const typeImage = file.mimetype.split("/").splice(1, 1);
      const newNameFile = `${uuid.v4()}.${typeImage}`;

      file.mv(
        path.join(__dirname + "/../uploads", "images/") + newNameFile,
        (err) => {
          if (err) {
            throw ApiError.BadRequest("Ошибка при загрузка файла");
          }
        }
      );

      return res.json({
        file: `${process.env.DOMEN_URL}/image/${newNameFile}`,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FileController();
