import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Switch from "@mui/material/Switch";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";

// import { EventListener } from '@material-ui/core';

function App() {
  //add
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  //updates
  const [edited, setEdited] = useState("");
  const [editedAuthor, setEditedAuthor] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  //fetch
  const [bookList, setBookList] = useState([]);

  //checkbox toggle
  const [selectedItems, setSelectedItems] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
          },
        ]);
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
            return val.id !== id;
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            maxWidth: "330px",
            margin: "auto",
            padding: 2,
            border: "1px solid #eaeaea",
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography
            sx={{ textAlign: "center" }}
            variant="h4"
            component="h2"
            gutterBottom
          >
            Add New Book
          </Typography>
          <TextField
            sx={{ marginBottom: 2 }}
            variant="outlined"
            label="Title"
            placeholder="Add Title..."
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            variant="outlined"
            label="Author"
            placeholder="Add Author..."
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            variant="outlined"
            label="Description"
            placeholder="Add Description..."
            id="outlined-multiline-static"
            multiline
            rows={4}
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button name="add" variant="contained" onClick={addBook}>
            Save New
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: 2,
        }}
      >
        {bookList.map((val, index, key) => {
          return (
            <Box key={val.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "330px",
                  margin: "auto",
                  padding: 2,
                  border: "1px solid #eaeaea",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  marginBottom: 2,
                }}
              >
                <h3>Title: {val.title}</h3>
                <Typography>Author: {val.author}</Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedItems.includes(val.id)}
                      onClick={() => {
                        // Toggle the selected state of the item
                        if (selectedItems.includes(val.id)) {
                          setSelectedItems(
                            selectedItems.filter((id) => id !== val.id)
                          );
                          setShowMore(true);
                        } else {
                          setSelectedItems([...selectedItems, val.id]);

                        }
                      }}
                    />
                  }
                  label="Show More"
                />
                <Box sx={{ display: "flex" }}>
                  {selectedItems.includes(val.id) && (
                    <Fade in={selectedItems.includes(val.id)}>
                      <Box>
                        <Typography sx={{ marginBottom: 2 }}>
                          Description: {val.description}
                        </Typography>
                        <TextField
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="outlined"
                          inputProps={{ maxLength: 20 }}
                          id="outlined-multiline-static"
                          label="Title"
                          type="text"
                          placeholder="Title"
                          value={edited[index]}
                          onChange={(event) =>
                            setEdited(
                              edited.map((val, i) =>
                                i === index ? event.target.value : val
                              )
                            )
                          }
                        />
                        <TextField
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="outlined"
                          inputProps={{ maxLength: 20 }}
                          id="outlined-multiline-static"
                          label="Author"
                          type="text"
                          placeholder="Author"
                          value={editedAuthor[index]}
                          onChange={(event) =>
                            setEditedAuthor(
                              editedAuthor.map((val, i) =>
                                i === index ? event.target.value : val
                              )
                            )
                          }
                        />
                        <TextField
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="outlined"
                          inputProps={{ maxLength: 20 }}
                          id="outlined-multiline-static"
                          label="Description"
                          multiline
                          rows={4}
                          type="text"
                          placeholder="Description"
                          value={editedDescription[index]}
                          onChange={(event) =>
                            setEditedDescription(
                              editedDescription.map((val, i) =>
                                i === index ? event.target.value : val
                              )
                            )
                          }
                        />
                        <Button
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            updateBook(val.id, index);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            deleteBook(val.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Fade>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
}

export default App;
