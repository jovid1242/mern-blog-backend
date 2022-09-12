const db = require("../../models");
const Banner = db.Banner;

class BannerService {
  async getAll() {
    return await Banner.findAll();
  }
  async createPost(value) {
    return await Banner.create(value);
  }

  async updatePost(value, id) {
    return Banner.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async deletePost(id) {
    return Banner.destroy({ where: { id: id } });
  }
}

module.exports = new BannerService();
