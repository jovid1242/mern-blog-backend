const BannerService = require("../services/banner/bannerService");

const ApiError = require("../exceptions/apiError");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

class BannerController {
  async getAll(req, res, next) {
    try {
      const posts = await BannerService.getAll();

      let arr = posts.sort(function (a, b) {
        return a.createdAt == b.createdAt
          ? 0
          : a.createdAt > b.createdAt
          ? -1
          : 1;
      });
      return res.json({ data: arr });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let params = req.body;
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

      const post = {
        title: params.title,
        text: params.text,
        imageUrl: newNameFile,
        viewCount: 0,
        category: params.category,
      };

      const data = await BannerService.createPost(post);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let params = req.body;
      if (req.files !== null) {
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

        const post = {
          title: params.title,
          text: params.text,
          imageUrl: newNameFile,
          viewCount: 0,
          category: params.category,
        };

        const data = await BannerService.updatePost(post, req.params.id);
        return res.json({ data });
      }

      const post = {
        title: params.title,
        text: params.text,
        imageUrl: params.imageUrl,
        viewCount: params.viewCount,
        category: params.category,
      };

      const data = await BannerService.updatePost(post, req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      let post = await BannerService.deletePost(req.params.id);
      return res.json({ post });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      let banner = await BannerService.getById(req.params.id);
      let pathFile =
        path.join(__dirname + "/../uploads", "images/") +
        banner.imageUrl.split("/")[5];
      fs.unlink(pathFile, (err) => {
        if (err) {
          return res.json({ message: "Файл не удаленно" });
        } else {
          BannerService.deletePost(req.params.id);
          return res.json({ banner });
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BannerController();
