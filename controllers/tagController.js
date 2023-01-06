const TagService = require("../services/tags/tagsService"); 

class TagController {
  async getAll(req, res, next) {
    try {
      const data = await TagService.getAll(); 
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const data = await TagService.createTag({ name: req.body.name });
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const data = await TagService.updateTag(
        { name: req.body.name },
        req.params.id
      );
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const data = await TagService.deleteTag(req.params.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TagController();
