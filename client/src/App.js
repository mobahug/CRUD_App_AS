import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Switch from "@mui/material/Switch";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

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

  const styles = {
    largeIcon: {
      width: 40,
      height: 40,
    },
  };

  //sending values to the backend database
  const addBook = () => {
    try {
      Axios.post("http://localhost:3006/create", {
        title: title,
        author: author,
        description: description,
      }).then((response) => {
        setEdited({
          ...edited,
          [response.data.insertId]: title,
        });
        setEditedAuthor({
          ...editedAuthor,
          [response.data.insertId]: author,
        });
        setEditedDescription({
          ...editedDescription,
          [response.data.insertId]: description,
        });
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

  const updateBook = (id) => {
    try {
      Axios.put("http://localhost:3006/update", {
        title: edited[id],
        author: editedAuthor[id],
        description: editedDescription[id],
        id: id,
      }).then((response) => {
        setBookList(
          bookList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  title: edited[id],
                  author: editedAuthor[id],
                  description: editedDescription[id],
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
      const confirm = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (confirm) {
        Axios.delete(`http://localhost:3006/delete/${id}`).then((response) => {
          setBookList(
            bookList.filter((val) => {
              return val.id !== id;
            })
          );
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      Axios.get("http://localhost:3006/booklist").then((response) => {
        setBookList(response.data);

        const editedObject = {};
        const editedAuthorObject = {};
        const editedDescriptionObject = {};

        response.data.forEach((value) => {
          editedObject[value.id] = value.title;
          editedAuthorObject[value.id] = value.author;
          editedDescriptionObject[value.id] = value.description;
        });

        setEdited(editedObject);
        setEditedAuthor(editedAuthorObject);
        setEditedDescription(editedDescriptionObject);
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
            sx={{ textAlign: "center", color: "primary.main" }}
            variant="h4"
            component="h2"
            gutterBottom
          >
            Add New Book{" "}
            <BookmarkBorderIcon
              style={styles.largeIcon}
              sx={{ marginBottom: -1 }}
            />
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
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            inputProps={{ maxLength: 200 }}
            required
            type="text"
            onChange={(event) => setDescription(event.target.value)}
            helperText={`Max ${description.length}/200 characters`}
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
        {bookList.map((val) => {
          return (
            <Box
              key={val.id}
              style={{
                whiteSpace: "pre-line",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                hyphens: "auto",
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
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ typography: "body1", fontSize: "20px" }}>
                  Title: <b>{val.title} </b>
                </Typography>
                <Box position="relative">
                  <Tooltip title="Saved">
                    <IconButton
                      edge="end"
                      style={{
                        position: "absolute",
                        left: "280px",
                        bottom: "10px",
                        zIndex: 1,
                      }}
                    >
                      <BookmarkIcon
                        sx={{ color: "primary.main" }}
                        style={styles.largeIcon}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography sx={{ typography: "subtitle2" }}>
                  Author: {val.author}
                </Typography>

                <FormControlLabel
                  sx={{ color: "text.secondary" }}
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
                          value={edited[val.id]}
                          onChange={(event) => {
                            setEdited({
                              ...edited,
                              [val.id]: event.target.value,
                            });
                          }
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
                          value={editedAuthor[val.id]}
                          onChange={(event) => {
                            setEditedAuthor({
                              ...editedAuthor,
                              [val.id]: event.target.value,
                            });
                          }}
                        />
                        <TextField
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="outlined"
                          inputProps={{ maxLength: 200 }}
                          id="outlined-multiline-flexible"
                          label="Description"
                          multiline
                          maxRows={4}
                          type="text"
                          placeholder="Description"
                          value={editedDescription[val.id]}
                          onChange={(event) => {
                            setEditedDescription({
                              ...editedDescription,
                              [val.id]: event.target.value,
                            });
                          }}
                          helperText="Max 200 characters"
                        />
                        <Button
                          sx={{ marginBottom: 2 }}
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            updateBook(val.id);
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
      <Box sx={{ pt: "5vh", pb: "20vh", textAlign: "center" }}>
        <Typography>
          &nbsp;&nbsp; Created by &nbsp;
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://github.com/mobahug"
            target="_blank"
            rel="noreferrer"
          >
            <b>ghorvath</b>
          </a>
        </Typography>
      </Box>
    </>
  );
}

export default App;
