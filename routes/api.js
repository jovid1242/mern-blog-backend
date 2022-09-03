const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const path = require("path");

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
router.post("/posts", postController.create);
router.delete("/posts/:id", postController.remove);
router.patch("/posts/:id", postController.update);
router.get("/posts-page", postController.getByPage);

// get image file
router.get("/image/:img", (req, res) => {
  const fileName = req.params.img;
  res.sendFile(path.join(__dirname + "/../uploads", "images/") + fileName);
});

module.exports = router;
