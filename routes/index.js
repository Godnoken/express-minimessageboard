var express = require("express");
var router = express.Router();
const Message = require("../schemas/Message");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const messagesFound = await Message.find({});

  try {
    res.render("index", { title: "Mini Messageboard", messages: messagesFound });
  }
  catch (error) {
    res.render("error", { title: "Error", error: error, message: error.message });
  }

});

router.get("/new", (req, res, next) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", async (req, res, next) => {

  const messageContent = new Message({
    user: req.body.name,
    text: req.body.message,
    added: new Date(),
  });

  try {
    await messageContent.save();
    res.redirect("/");
  }
  catch (error) {
    res.render("error", { title: "Error", error: error, message: error.message });
  }

});

module.exports = router;
