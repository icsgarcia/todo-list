const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getRefreshToken,
    logout,
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.post("/token", getRefreshToken);
router.post("/logout", logout);

module.exports = router;
