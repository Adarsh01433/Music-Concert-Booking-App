const { error } = require("winston");
const logger = require("../../config/logger");
const { signUpEmail, verifyOTP } = require("../services/authService");

const signupEmailCtrl = async (req, res) => {
  try {
    const result = await signUpEmail(req.body);
    logger.info("Signup success", { email: req.body.email });

    res.json(result);
  } catch (err) {
    logger.error("Signup Error", { err });
    res.status(400).json({ error: err.message });
  }
};

const verifyOTPCtrl = async (req, res) => {
  try {
    const tokens = await verifyOTP(req.body);

    res.json(tokens);
  } catch (err) {
    logger.error("OTP verify Error", { err });
    res.status(400).json({ error: err.message });
  }
};

const loginEmailCtrl = async (req, res) => {
  try {
    const tokens = await login(req.body);
    logger.info("Login success", { email: req.body.email });

    res.json(tokens);
  } catch (err) {
    logger.error("OTP verify Error", { err });
    res.status(400).json({ error: err.message });
  }
};


const refreshCtrl = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken || typeof refreshToken !== "string") {
      return res
        .status(400)
        .json({ error: "Refresh token is required" });
    }

    const tokens = await refresh(refreshToken);

    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (err) {
    logger.error("Refresh token failed", {
      error: err.message,
      body: req.body,
    });

    res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }
};

const logoutCtrl = async (req, res) => {
  try {
    await logout(req.user.userId);

    logger.info("Logout success", { userId: req.user.userId });

    res.json({ message: "Logged out" });
  } catch (err) {
    logger.error("Logout error", { err });
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  signupEmailCtrl,
  verifyOTPCtrl,
  loginEmailCtrl,
  refreshCtrl,
  logoutCtrl
};