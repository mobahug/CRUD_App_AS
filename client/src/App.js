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
      }).then((response) => {
        setBookList([
          ...bookList,
          {
            title: title,
            author: author,
            description: description,
            id: response.data.insertId,
          }])
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = (id, index) => {
    try {
      Axios.put("http://localhost:3006/update", {
        title: edited[index],
        author: editedAuthor[index],
        description: editedDescription[index],
        id: id,
      }).then((response) => {
        setBookList(
          bookList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                title: edited[index],
                author: editedAuthor[index],
                description: editedDescription[index],
              }
              : val;
          })
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = (id) => {
    try {
      Axios.delete(`http://localhost:3006/delete/${id}`).then((response) => {
        setBookList(
          bookList.filter((val) => {
            return (val.id !== id
            );
          })
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      Axios.get("http://localhost:3006/booklist").then((response) => {
        setBookList(response.data);


        setTitle(response.data.map((val) => val.title));
        setAuthor(response.data.map((val) => val.author));
        setDescription(response.data.map((val) => val.description));

        setEdited(response.data.map((val) => val.title));
        setEditedAuthor(response.data.map((val) => val.author));
        setEditedDescription(response.data.map((val) => val.description));
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
          <Button name="add" variant="contained" onClick={addBook}>Save New</Button>
          ---------------------------------------------------------
        </div>
      </div>
      <div className="employees">
        {bookList.map((val, index, key) => {
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
                  value={edited[index]}
                  onChange={(event) => setEdited(edited.map ((val, i) => i === index ? event.target.value : val))}
                />
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Author"
                  type="text"
                  placeholder="Author"
                  value={editedAuthor[index]}
                  onChange={(event) => setEditedAuthor(editedAuthor.map ((val, i) => i === index ? event.target.value : val))}
                />
                <TextField
                  inputProps={{ maxLength: 20 }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  type="text"
                  placeholder="Description"
                  value={editedDescription[index]}
                  onChange={(event) => setEditedDescription(editedDescription.map ((val, i) => i === index ? event.target.value : val))}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    updateBook(val.id, index);
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
