const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const AdminController = require('../controllers/admin.controllerr');
const UserController = require('../controllers/user.controller');
router.get('/', ProductController.getAllGames);
router.get('/:id', ProductController.getOneGame);
router.post('/cart', ProductController.addToCart);
router.get('/cart-user/:id', ProductController.getDetailCartUser);
router.delete('/cart/:idCart', ProductController.deleteDetailCartUser);
router.post('/payment/:id', ProductController.postPayment);
router.get('/payment/:id', ProductController.getAllPaymentDetails);
router.post('/admin/login', AdminController.loginAdmin);
router.delete('/:idGame', ProductController.deleteGame);
router.post('/post-game', ProductController.postGame);
router.patch('/edit-game/:idGame', ProductController.patchGame)
module.exports = router;
