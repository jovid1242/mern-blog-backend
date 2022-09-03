const PostDto = require("../dtos/postDto");
const PostService = require("../services/posts/PostService");

const ApiError = require("../exceptions/apiError");
const path = require("path");
const uuid = require("uuid");

class PostController {
  async getAll(req, res, next) {
    try {
      const posts = await PostService.getAll();

      let arr = posts.sort(function (a, b) {
        return a.createdAt == b.createdAt
          ? 0
          : a.createdAt > b.createdAt
          ? -1
          : 1;
      });
      return res.json({ posts: arr });
    } catch (e) {
      next(e);
    }
  }

  async getPostsByCategory(req, res, next) {
    try {
      const posts = await PostService.getByCategory(req.params.category_id);
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
        category: params.category,
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
          category: params.category,
        };

        const data = await PostService.updatePost(post, req.params.id);
        return res.json({ data });
      }

      const post = {
        title: params.title,
        text: params.text,
        imageUrl: params.imageUrl,
        viewCount: params.viewCount,
        category: params.category,
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

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await PostService.getAll();
      const limits = 5;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const post = await PostService.getByPage(page, limits);
      let sortPost = post.rows.sort(function (a, b) {
        return a.createdAt == b.createdAt
          ? 0
          : a.createdAt > b.createdAt
          ? -1
          : 1;
      });
      if (countPage === 0) {
        return res.json({
          pages: 1,
          post: { count: post.count, rows: sortPost },
        });
      }
      return res.json({ pages: countPage, post });
    } catch (e) {
      next(e);
    }
  }

  async getPopularPosts(req, res, next) {
    try {
      const posts = await PostService.getAll();

      let arr = posts.sort(function (a, b) {
        return a.viewCount == b.viewCount
          ? 0
          : a.viewCount < b.viewCount
          ? 1
          : -1;
      });

      return res.json({ popularPosts: arr.slice(0, 3) });
    } catch (e) {
      next(e);
    }
  }

  async getResentPosts(req, res, next) {
    try {
      const posts = await PostService.getAll();

      let arr = posts.sort(function (a, b) {
        return a.createdAt == b.createdAt
          ? 0
          : a.createdAt > b.createdAt
          ? -1
          : 1;
      });

      return res.json({ resentPosts: arr.slice(0, 3) });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostController();
