const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use("/icons", express.static(path.join(__dirname, "icons")));

app.get("/sw.js", (req, res) => {
  res.sendFile(path.join(__dirname, "sw.js"));
});

app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "manifest.json"));
});

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
