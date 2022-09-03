const CategoryDto = require("../dtos/categoryDto");
const CategoryService = require("../services/category/CategoryService");

class CategoryController {
  async getAll(req, res, next) {
    try {
      const data = [];
      const collections = await CategoryService.getAll();

      collections.forEach((el) => {
        data.push(new CategoryDto(el));
      });

      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let params = req.body;
      const category = {
        title: params.title,
      };
      const data = await CategoryService.create(category);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      let params = req.body;

      const category = {
        title: params.title,
      };
      const data = await CategoryService.update(category, req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      let category = await CategoryService.remove(req.params.id);

      return res.json({ category });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      let category = await CategoryService.getById(req.params.id);
      return res.json({ category });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();
