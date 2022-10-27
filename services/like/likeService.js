const db = require("../../models");
const Like = db.posts_liked_users;

class LikeService {
  async liked(value) {
    return await Like.create(value);
  }

  async getLikes() {
    return await Like.findAll();
  }

  async checked(post_id, user_id) {
    return await Follow.findOne({
      where: { post_id, user_id },
    });
  }

  async unliked(post_id, user_id) {
    return Like.destroy({ where: { post_id, user_id } });
  }
}

module.exports = new LikeService();
