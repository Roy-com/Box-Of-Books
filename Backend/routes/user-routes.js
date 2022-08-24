const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user-controller");


router.post("/login", userControllers.Login);
router.post("/signup", userControllers.Signup);
router.post("/emailsend", userControllers.EmailSend);
router.post("/otpverification", userControllers.OtpVerification);
router.post("/resetpassword", userControllers.ResetPassword);
router.get("/getallusers", userControllers.GetAllUsers)
router.get("/:id",userControllers.GetByID);
router.post("/token",userControllers.Refreshtoken)
router.delete("/logout" ,userControllers.Logout)

module.exports = router;

