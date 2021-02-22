const express = require('express');
const router = express.Router();

const authController = require('controllers').authController;
const tokenRouter = require('routes/auth/token');

router.post('/signup', authController.signSchema, authController.signup);
router.post('/signin', authController.signSchema, authController.signin);
router.use('/token', tokenRouter);

module.exports = router;
