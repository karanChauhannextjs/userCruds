const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");
const multer = require("multer");

const staticRoute = require("./routes/staticRoute");
const app = express();
const PORT = 9001;

connectMongoDb("mongodb://localhost:27017/crudUser").then(() =>
  console.log("MongoDb Connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/signup", (req, res) => res.render("signup"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("profileImage"), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);

  return res.json({
    message: "uploded file succesfully",
  });
});

app.get("/", (req, res) => {
  return res.render("upload");
});

app.listen(PORT, () => console.log(`Server Started on : ${PORT}`));
