const db = require("../../models");
const Follow = db.follow;

class FollowService {
  async following(value) {
    return await Follow.create(value);
  }

  async getFollows() {
    return await Follow.findAll();
  }

  async checked(following_user_id, followed_user_id) {
    return await Follow.findOne({
      where: { following_user_id, followed_user_id },
    });
  }

  async unfollowing(following_user_id, followed_user_id) {
    return Follow.destroy({ where: { following_user_id, followed_user_id } });
  }
}

module.exports = new FollowService();
