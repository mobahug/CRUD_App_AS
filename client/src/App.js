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
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

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
        author: editedAuthor,
        description: editedDescription,
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
  }, [bookList, edited, editedAuthor, editedDescription]);

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
      <div >
        {bookList.map((val, key) => {
          return (
            <div key={val.id} className="employee">
              <div>
                <h3>Title: {val.title}</h3>
                <Typography>Author: {val.author}</Typography>
                <Typography>Description: {val.description}</Typography>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Title"
                  type="text"
                  placeholder="Title"
                  onChange={(event) => setEdited(event.target.value)}
                />
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Author"
                  type="text"
                  placeholder="Author"
                  onChange={(event) => setEditedAuthor(event.target.value)}
                />
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  type="text"
                  placeholder="Description"
                  onChange={(event) => setEditedDescription(event.target.value)}
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
