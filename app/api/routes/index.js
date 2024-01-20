const express = require('express');

const usersRouter = require('./user.routes');

const router = express.Router();

router.use('/user', usersRouter);

module.exports = router;
