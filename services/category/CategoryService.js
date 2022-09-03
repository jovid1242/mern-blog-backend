const db = require("../../models");
const Category = db.Category;

class CatgeoryService {
  async getAll() {
    return await Category.findAll();
  }

  async getById(id) {
    return await Category.findOne({
      where: { id },
    });
  }

  async create(value) {
    return await Category.create(value);
  }

  async update(value, id) {
    return Category.findOne({ where: { id: id } }).then(function (obj) {
      // update
      if (obj) return obj.update(value);
    });
  }

  async remove(id) {
    return Category.destroy({ where: { id: id } });
  }
}

module.exports = new CatgeoryService();
