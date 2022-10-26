const db = require("../../models");
const Posts = db.Post;

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

  async getByAuthor(user_id) {
    return await Posts.findAndCountAll({
      where: {
        user_id: user_id,
      },
    });
  }

  async getCategoryByPage(category_id, page, limit) {
    return await Posts.findAndCountAll({
      offset: page,
      limit: limit,
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

  async authorPosts(id) {
    return await Posts.findAndCountAll({
      where: { user_id: id },
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

  async viewUpdate(post, id) {
    return Posts.findOne({ where: { id: id } }).then(function (obj) {
      if (obj) return obj.update({ viewCount: post.viewCount + 1 });
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
