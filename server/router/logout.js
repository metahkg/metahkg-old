//logout
//GET /api/logout
require("dotenv").config();
const express = require("express");
const router = express.Router();
router.get("/api/logout", (req, res) => {
  res.cookie("key", "none", {
    expires: new Date(Date.now() + 5),
    httpOnly: true,
    domain: process.env.domain,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});
module.exports = router;
