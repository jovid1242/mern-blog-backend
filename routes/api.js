const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const path = require("path");

// controllers
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const categoryController = require("../controllers/categoryController");
const fileController = require("../controllers/fileController");
const userController = require("../controllers/userCintroller");
const bannerController = require("../controllers/bannerController");

router.post(
  "/register",
  body("name").isLength({ min: 3 }),
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.registration
);
router.post(
  "/login",
  body("email").isLength({ min: 3 }),
  body("password").isLength({ min: 3, max: 32 }),
  authController.login
);

// post
router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);
router.get("/posts-page", postController.getByPage);
router.get("/posts-popular", postController.getPopularPosts);
router.get("/posts-resent", postController.getResentPosts);
router.post("/post", postController.create);
router.delete("/posts/:id", postController.remove);
router.patch("/posts/:id", postController.update);
router.post("/post-view/:id", postController.viewControll);

router.get("/category/:category_id", postController.getPostsByCategory);
router.get("/author/:user_id", postController.getPostsByCategory);

// category
router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getOne);
router.post("/categories", categoryController.create);
router.delete("/categories/:id", categoryController.remove);
router.patch("/categories/:id", categoryController.update);

// users
router.get("/users", userController.getAll);
router.get("/user/:id", userController.getUser);
router.delete("/user/:id", userController.remove);
router.get("/get_users", userController.getByPage);

// banner
router.post("/banner", bannerController.create);
router.get("/banners", bannerController.getAll);

// image file
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});
router.post("/uploads", fileController.create);

module.exports = router;
