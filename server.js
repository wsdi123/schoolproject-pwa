const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use("/icons", express.static("icons"));

app.set("view engine", "ejs");

const appNaam = "Healthify";

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    appNaam,
  });
});

app.get("/overzicht", (req, res) => {
  res.render("overzicht", {
    title: "Overzicht",
    appNaam,
  });
});

app.get("/toevoegen", (req, res) => {
  res.render("toevoegen", {
    title: "Toevoegen",
    appNaam,
  });
});

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
