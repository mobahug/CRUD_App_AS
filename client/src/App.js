import "./App.css";
import { useState, useEffect } from "react";
import * as React from "react";
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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Alert from "@mui/material/Alert";

function App() {
  //popup on delete
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  //error message
  const [error, setError] = useState(false);

  //success message
  const [success, setSuccess] = useState(false);

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
      if (title === "" || author === "" || description === "") {
        setError(true);
      } else {
        setSuccess(true);
        //clearing the input fields
        setTitle("");
        setAuthor("");
        setDescription("");
      }
    } catch (err) {
      console.log(err);
      setError(true);
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
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
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
      // }
      setOpen(false);
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

      if (success) {
        setTitle("");
        setAuthor("");
        setDescription("");
      }
      const timer = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }, [success, error]);

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
          {error && (
            <Alert sx={{ marginBottom: 2 }} severity="error">
              Please fill in all fields!
            </Alert>
          )}
          {success && (
            <Alert sx={{ marginBottom: 2 }} severity="success">
              Book added successfully!
            </Alert>
          )}
          <TextField
            sx={{ marginBottom: 2 }}
            variant="outlined"
            label="Title"
            placeholder="Add Title..."
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={error && title === ""}
          />
          <TextField
            sx={{ marginBottom: 2 }}
            variant="outlined"
            label="Author"
            placeholder="Add Author..."
            inputProps={{ maxLength: 20 }}
            required
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            error={error && author === ""}
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            helperText={`Max ${description.length}/200 characters`}
            error={error && description === ""}
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
                        {error && (
                          <Alert sx={{ marginBottom: 2 }} severity="error">
                            Please fill in all fields!
                          </Alert>
                        )}
                        {success && (
                          <Alert sx={{ marginBottom: 2 }} severity="success">
                            Book edited successfully!
                          </Alert>
                        )}
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
                          }}
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
                          autoFocus
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
                          variant="outlined"
                          onClick={handleClickOpen}
                        >
                          Delete
                        </Button>
                        <Dialog
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">
                            {`Are you sure you want to delete '${val.title}' book?`}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              This action cannot be undone.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="contained"
                              autoFocus
                              onClick={handleClose}
                            >
                              CANCEL
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={() => {
                                deleteBook(val.id);
                              }}
                            >
                              DELETE
                            </Button>
                          </DialogActions>
                        </Dialog>
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
