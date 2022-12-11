const Router = require('express').Router
const router = new Router()
const password = require('passport')
const { body } = require('express-validator')
const path = require('path')

// controllers
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')
const categoryController = require('../controllers/categoryController')
const fileController = require('../controllers/fileController')
const userController = require('../controllers/userController')
const bannerController = require('../controllers/bannerController')
const likeController = require('../controllers/likeController')
const followController = require('../controllers/followController')

// auth routes
// router.post(
//   "/register",
//   body("username").isLength({ min: 3 }),
//   body("email").isLength({ min: 3 }),
//   body("password").isLength({ min: 3, max: 32 }),
//   authController.registration
// );

// router.post(
//   "/login",
//   body("email").isLength({ min: 3 }),
//   body("password").isLength({ min: 3, max: 32 }),
//   authController.login
// );

router.get('/login/succes', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Successfuly Loged in',
            user: req.user,
        })
    } else {
        res.status(403).json({
            error: true,
            message: 'Not Authorized',
        })
    }
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Log in failure',
    })
})

router.get(
    '/google/callback',
    password.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/login/failed',
    })
)

app.get('/google', passport.authenticate('google', ['profile', 'email']))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_URL)
})

router.get('/refresh', authController.refresh)

// post
router.get('/posts', postController.getAll)
router.get('/posts/:title/:id', postController.getOne)
router.get('/posts-page', postController.getByPage)
router.get('/posts-popular', postController.getPopularPosts)
router.get('/posts-resent', postController.getResentPosts)
router.post('/post', authMiddleware, postController.create)
router.delete('/posts/:id', postController.remove)
router.patch('/post/:id', postController.update)
router.post('/post-view/:id', postController.viewControll)

// like post
router.post('/post/:id/like', authMiddleware, likeController.liked)
router.post('/post/:id/unlike', authMiddleware, likeController.unliked)

// follow FollowController
router.post('/user/:id/follow', authMiddleware, followController.following)
router.post('/user/:id/unfollow', authMiddleware, followController.unfollowing)
router.get('/user/follow', authMiddleware, followController.getAll)

router.get('/category/:category_id', postController.getPostsByCategory)
router.get('/author/posts/:user_id', postController.getPostsByAuthor)

// category
router.get('/categories', categoryController.getAll)
router.get('/categories/:id', categoryController.getOne)
router.post('/categories', categoryController.create)
router.delete('/categories/:id', categoryController.remove)
router.patch('/categories/:id', categoryController.update)

// users
router.get('/users', userController.getAll)
router.get('/user/:id', userController.getUserById)
router.delete('/user/:id', userController.remove)
router.get('/get_users', userController.getByPage)
router.get('/auth/me', authMiddleware, userController.getUser)
router.post('/user/edit', authMiddleware, userController.updateInfo)

// author
router.get('/author/posts', authMiddleware, postController.getAuthorPosts)
router.get('/author/:id/posts', postController.getAuthorPostsAll)
router.delete(
    '/author/post/:id',
    authMiddleware,
    postController.removeAuthorPosts
)

// banner
router.post('/banner', bannerController.create)
router.delete('/banner/:id', bannerController.remove)
router.get('/banners', bannerController.getAll)

// image file
router.get('/image/:img', (req, res) => {
    const fileName = req.params.img
    res.sendFile(path.join(__dirname + '/../uploads', 'images/') + fileName)
})
router.post('/uploads', fileController.create)

module.exports = router
