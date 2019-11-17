const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(path.join(__dirname, "../public")));

//Set up handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Paul"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Paul"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: " This is some helpful text",
    title: "Help",
    name: "Paul"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(long, lat, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Paul",
    pageText: "Help page not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    pageText: "Page not found",
    name: "Paul"
  });
});

app.listen(port, () => {
  console.log("Server started on port: " + port);
});
