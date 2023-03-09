require("dotenv").config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.set("port", process.env.PORT || 3001);
app.locals.title = "deadstock-api";

app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}.`
  );
});
