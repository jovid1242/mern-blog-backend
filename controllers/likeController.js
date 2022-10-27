const LikeService = require("../services/like/likeService");

class LikeController {
  async liked(req, res, next) {
    try {
      let chek = await LikeService.checked(req.params.id, req.user.id);

      if (chek !== null) {
        return res.status(412).json({ message: "Ошибка" });
      } else {
        const data = await LikeService.liked({
          post_id: req.params.id,
          user_id: req.user.id,
        });
        return res.json({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  async unliked(req, res, next) {
    try {
      const data = await LikeService.unliked(req.params.id, req.user.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LikeController();
