const db = require("../../models");
const Tags = db.Tags;

class TagService {
  async getAll() {
    return await Tags.findAll();
  }   

  async getTagsById(id) {
    return await Tags.findOne({
      where: { id },
    });
  } 

  async createTag(value) {
    return await Tags.create(value);
  }

  async updateTag(value, id) {
    return Tags.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  } 

  async deleteTag(id) {
    return Tags.destroy({ where: { id: id } });
  }
 
}

module.exports = new TagService();
