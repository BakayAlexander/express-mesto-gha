const express = require("express");
const path = require("path");
const { routes } = require("./routes/app.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//const PUBLIC_FOLDER = path.join(__dirname, "public");
// app.use(express.static(PUBLIC_FOLDER));

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json()); //сборка json-формата
app.use(bodyParser.urlencoded({ extended: true })); //прием web-страниц

app.use((req, res, next) => {
  req.user = {
    _id: "62384cf6ca7a52f769d35e5e", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(routes);

async function main() {
  try {
    console.log("Starting connect to db");
    await mongoose.connect("mongodb://localhost:27017/mestodb");
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Starting app on port ${PORT}`);
  });
}

main();
