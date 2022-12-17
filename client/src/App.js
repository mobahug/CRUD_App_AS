import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  //updates
  const [edited, setEdited] = useState("");

  //fetch
  const [bookList, setBookList] = useState([]);

  //sending values to the backend database
  const addBook = () => {
    try {
      Axios.post("http://localhost:3006/create", {
        title: title,
        author: author,
        description: description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = (id) => {
    try {
      Axios.put("http://localhost:3006/update", {
        title: edited,
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = (id) => {
    try {
      Axios.delete(`http://localhost:3006/delete/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      Axios.get("http://localhost:3006/booklist").then((response) => {
        setBookList(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [bookList, edited]);

  return (
    <>
      <div className="App">
        <div className="information">
          <Typography>Title</Typography>
          <TextField
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Typography>Author</Typography>
          <TextField
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
          />
          <Typography>Description</Typography>
          <TextField
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button variant="contained" onClick={addBook}>Save New</Button>
          ---------------------------------------------------------
        </div>
      </div>
      <div className="employees">
        {bookList.map((val, key) => {
          return (
            <div key={val.id} className="employee">
              <div>
                <h3>Title: {val.title}</h3>
                <p>Author: {val.author}</p>
                <p>Description: {val.description}</p>
              </div>
              <div>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  type="text"
                  placeholder="New Wage"
                  value= {val.title}
                  onChange={(event) => setEdited(event.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    updateBook(val.id);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteBook(val.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
