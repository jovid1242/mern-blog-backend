const FollowService = require("../services/follow/followService");

class FollowController {
  async getAll(req, res, next) {
    try {
      const data = await FollowService.getFollows();
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }

  async following(req, res, next) {
    try {
      if (toString(req.params.id) === toString(req.user.id)) {
        return res
          .status(412)
          .json({ message: "Вы не можете подписаться сами себе" });
      }

      let getFolow = await FollowService.checked(req.params.id, req.user.id);

      if (getFolow !== null) {
        return res.status(412).json({ message: "Уже подписано" });
      } else {
        const data = await FollowService.following({
          following_user_id: req.params.id,
          followed_user_id: req.user.id,
        });
        return res.json({ data });
      }
    } catch (e) {
      next(e);
    }
  }

  async unfollowing(req, res, next) {
    try {
      const data = await FollowService.unfollowing(req.params.id, req.user.id);
      return res.json({ data });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FollowController();
