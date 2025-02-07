const express = require("express");
const router = express.Router();

router("/users", userRoutes);
router("/todos", todoRoutes);

module.exports = router;
