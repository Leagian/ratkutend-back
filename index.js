const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const database = require("./config/db");
const app = express();
app.use(morgan("tiny"));
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.get("/test", (req, res) => {
  database
    .query(
      "SELECT * from rats inner join vitesse on rats.vitesse = vitesse.id inner join contagion on rats.contagion = contagion.id inner join menace on rats.menace = menace.id"
    )
    .then(([rats]) => {
      res.json(rats);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
});
app.get("/", (req, res) => {
  console.log("une nouvelle requête est arrivée dans l’API !  ");
  res.json("je suis dans le /");
});
app.listen(4242, console.log("http://localhost:4242"));
