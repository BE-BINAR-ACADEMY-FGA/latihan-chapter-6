const express = require("express");
const dotenv = require("dotenv");
const app = express();
const router = require("./routes/route");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
app.use("/image", express.static("public/image"));
app.use("/file", express.static("public/file"));

app.get("/", (req, res) => {
  res.send("Latihan chapter 6");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
