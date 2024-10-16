const express = require ("express");
const users = require("../model/user");
const userController = require("../controller/user")


const router = express.Router();

router.post("/signup" , userController.signUp);

router.post("/login",userController.loginUser);
router.put ("/update",userController.updateUser);

router.get("/users",userController.getAllUsers);



module.exports = router;