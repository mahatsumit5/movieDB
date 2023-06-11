const { error } = require("console");
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const request = require("request");
const API = "b18e934315b825cd91d9e529a91467b9";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//middleware
app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  let query = req.query.search;

  request(
    `https://api.themoviedb.org/3/search/movie?api_key=${API}&query=` + query,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }
      let data = JSON.parse(body);
      console.log(data.results);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
