const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    process.env.MONGODB_URI
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const MessageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  const message = await Message.findOne().sort({ createdAt: -1 });
  res.render("index", {
    username: req.query.username || "Phạm Tự",
    title: "Trang Chủ",
    message: message,
  });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
