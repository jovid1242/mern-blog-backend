const PostDto = require("../dtos/postDto");
const PostService = require("../services/posts/PostService");

const ApiError = require("../exceptions/apiError");
const path = require("path");
const uuid = require("uuid");

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = [];
      const collections = await PostService.getAll();

      collections.forEach((el) => {
        posts.push(new PostDto(el));
      });

      return res.json({ posts });
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
        imageUrl: `${process.env.DOMEN_URL}/api/image/${newNameFile}`,
        viewCount: 0,
      };

      const data = await PostService.createPost(post);
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
          imageUrl: `${process.env.DOMEN_URL}/api/image/${newNameFile}`,
          viewCount: 0,
        };

        const data = await PostService.updatePost(post, req.params.id);
        return res.json({ data });
      }

      const post = {
        title: params.title,
        text: params.text,
        imageUrl: params.imageUrl,
        viewCount: params.viewCount,
      };

      const data = await PostService.updatePost(post, req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      let post = await PostService.deletePost(req.params.id);

      return res.json({ post });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      let post = await PostService.getPostById(req.params.id);
      return res.json({ post });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostController();
