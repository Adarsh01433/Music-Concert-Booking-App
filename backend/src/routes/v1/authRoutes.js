

const express = require("express");
const { authLimiter } = require("../../middlewares/rateLimit");
const validationMiddleware = require("../../middlewares/validation");
const { signupEmailCtrl, verifyOTPCtrl, loginEmailCtrl, refreshCtrl, logoutCtrl } = require("../../controllers/authController");
const { emailSignUpSchema, otpVerifySchema } = require("../../utils/schemas");

const router = express.Router();

router.post("/signup/email", authLimiter , validationMiddleware  (emailSignUpSchema), signupEmailCtrl);

router.post("/verify-otp", authLimiter, validationMiddleware (otpVerifySchema) , verifyOTPCtrl);

router.post("/login/email", authLimiter , validationMiddleware (emailSignUpSchema), loginEmailCtrl);

router.post("/refresh" , refreshCtrl);

router.post("/logout", logoutCtrl);

module.exports = router