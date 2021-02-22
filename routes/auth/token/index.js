const express = require('express');
const router = express.Router();

const authController = require('controllers').authController;
const authorize = require('middlewares').authorize;

router.post('/refresh', authController.refreshToken);
router.post('/revoke', authorize(), authController.revokeTokenSchema, authController.revokeToken);
router.get('/:id', authorize(), authController.getRefreshTokens)

module.exports = router;
