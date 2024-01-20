const express = require('express');
const userCtrl = require("../controllers/user.controller");
const authenticateToken = require('../helper/authenticateToken');

const router = express.Router();


//get medthod
router.post("/login", userCtrl.apiLogin);
router.get('/getAll', authenticateToken, userCtrl.apiGetAllUser);

//post medthod
router.post("/createUser", userCtrl.apiCreateUser);
router.post("/changePassword/:id", userCtrl.apiChangePasswordUser);

//PUT medthod
router.put("/updateUser/:id", userCtrl.apiUpdateUser);

//Delete method
router.delete("/deleteUser/:id", userCtrl.apiDeleteUser);

module.exports = router;