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
router.get("/category/:category_id", postController.getPostsByCategory);
router.get("/posts/:id", postController.getOne);
router.get("/posts-page", postController.getByPage);
router.get("/posts-popular", postController.getPopularPosts);
router.get("/posts-resent", postController.getResentPosts);
router.post("/posts", postController.create);
router.delete("/posts/:id", postController.remove);
router.patch("/posts/:id", postController.update);

// category
router.get("/category", categoryController.getAll);
router.get("/category/:id", categoryController.getOne);
router.post("/category", categoryController.create);
router.delete("/category/:id", categoryController.remove);
router.patch("/category/:id", categoryController.update);

// get image file
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

module.exports = router;
