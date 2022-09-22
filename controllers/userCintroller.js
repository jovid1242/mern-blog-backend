const userDto = require("../dtos/userDto");
const ApiError = require("../exceptions/apiError");
const UserService = require("../services/userService");

class userController {
  async getAll(req, res, next) {
    try {
      const users = [];
      const collections = await UserService.getAll();

      collections.forEach((el) => {
        users.push(new userDto(el));
      });

      return res.json({ users });
    } catch (e) {
      next(e);
    }
  }

  async getByPage(req, res, next) {
    try {
      const reqPage = req.query.page > 0 ? req.query.page : 1;
      const collections = await UserService.getAll();
      const limits = 6;
      const page = (reqPage - 1) * limits;
      const countPage = Math.round(collections.length / limits);
      const user = await UserService.getByPage(page, limits);
      if (countPage === 0) {
        return res.json({ pages: 1, user });
      }
      return res.json({ pages: countPage, user });
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      let user = await UserService.getUser(req.params.id);
      return res.json({ user });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      let users = await UserService.getAll();
      return res.json({ users });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      if (
        req.body.secret_key ===
        "super_admin_blog#$3543534545645645ddfb565sdbdtb"
      ) {
        await PostService.removeuser(req.params.id);
        return res.json({ ok: req.params.id });
      } else {
        return res
          .status(412)
          .json({ message: "Вы не имеете права удалить автора" });
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new userController();
