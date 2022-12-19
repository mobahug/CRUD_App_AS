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
  database: "employeeSchema",
});

app.post("/create", (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    if (title.length > 20 || author.length > 20 || description.length > 200) {
      return;
    } else {
      db.query(
        "INSERT INTO employees (title, author, description) VALUES (?,?,?)",
        [title, author, description],
        (err, result) => {
          if (err) {
            console.log(err);
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
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
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
    if (title.length > 20 || author.length > 20 || description.length > 200)
      return;
    db.query(
      "UPDATE employees SET title = ?, author = ?, description = ? WHERE id = ?",
      [title, author, description, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3006, () => {
  console.log("Server listening on port 3006");
});
