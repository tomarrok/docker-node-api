const express = require('express');
const router = express.Router();

const authRouter = require('routes/auth');
const userRouter = require('routes/user');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
