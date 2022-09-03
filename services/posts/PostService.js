const db = require("../../models");
const Posts = db.Posts;

class PostService {
  async getAll() {
    return await Posts.findAll();
  }

  async getByCategory(category_id) {
    return await Posts.findAndCountAll({
      where: {
        category: category_id,
      },
    });
  }

  async getPostById(id) {
    return await Posts.findOne({
      where: { id },
    });
  }

  async createPost(value) {
    return await Posts.create(value);
  }

  async updatePost(value, id) {
    return Posts.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deletePost(id) {
    return Posts.destroy({ where: { id: id } });
  }

  async getByPage(page, limit) {
    return await Posts.findAndCountAll({
      offset: page,
      limit: limit,
    });
  }
}

module.exports = new PostService();
