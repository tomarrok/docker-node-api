const express = require('express');
const router = express.Router();

const userController = require('controllers').userController;
const authorize = require('middlewares').authorize;
const Role = require('helpers').Role;

router.get('/', authorize(Role.Admin), userController.getAll);
router.get('/:id', authorize(), userController.getById);

module.exports = router;
