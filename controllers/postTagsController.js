const TagService = require("../services/tags/postTagsService");

class PostTagController {
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
      const data = await TagService.createTag({
        post_id: req.body.post_id,
        tag_id: req.body.tag_id,
      });
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const data = await TagService.updateTag(
        { post_id: req.body.post_id, tag_id: req.body.tag_id },
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

module.exports = new PostTagController();
