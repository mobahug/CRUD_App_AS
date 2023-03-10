const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bookSchema",
});

app.post("/create", (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    if (title == "" || author == "" || description == "") return;
    if (title.length > 20 || author.length > 20 || description.length > 200) {
      return;
    } else {
      db.query(
        "INSERT INTO books (title, author, description) VALUES (?,?,?)",
        [title, author, description],
        (err, result) => {
          if (err) {
            console.log(err);
            res.send({ err: err });
          } else {
            res.send(result);
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/booklist", (req, res) => {
  try {
    db.query("SELECT * FROM books", (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    if (title == "" || author == "" || description == "") return;
    if (title.length > 20 || author.length > 20 || description.length > 200)
      return;
    db.query(
      "UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?",
      [title, author, description, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.send({ err: err })
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.send(400).json({ err: err });
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query("DELETE FROM books WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3007, () => {
  console.log("Server listening on port 3007");
});
