const express = require('express');
const router = express.Router();
const { GetUser, Register, GetOneUser, EditUser, DeleteUser, Login } = require('../Controller/controller');

router.route("/").get(GetUser);
router.route("/:id").get(GetOneUser).put(EditUser).delete(DeleteUser);
router.route("/register").post(Register);
router.route("/login").post(Login);
module.exports = router;