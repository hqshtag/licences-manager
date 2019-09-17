const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Top Secret" });
});

module.exports = router;
