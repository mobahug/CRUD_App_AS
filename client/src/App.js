import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

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
    Axios.post("http://localhost:3006/create", {
      title: title,
      author: author,
      description: description,
    });
  };

  const updateBook = (id) => {
    Axios.put("http://localhost:3006/update", {
      title: edited,
      id: id,
    });
  };

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3006/delete/${id}`);
  };

  useEffect(() => {
    Axios.get("http://localhost:3006/booklist").then((response) => {
      setBookList(response.data);
    });
  }, [bookList, edited]);

  return (
    <>
      <div className="App">
        <div className="information">
          <label>Title</label>
          <input
            type="text"
            onChange={(event) => setTitle(event.target.value)}
          />
          <label>Author</label>
          <input
            type="text"
            onChange={(event) => setAuthor(event.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            onChange={(event) => setDescription(event.target.value)}
          />
          <button onClick={addBook}>Save New</button>
          ---------------------------------------------------------
        </div>
      </div>
      <div className="employees">
        {bookList.map((val, key) => {
          return (
            <div key={val.id} className="employee">
              <div>
                <h3>Employee: {val.title}</h3>
                <p>Age: {val.author}</p>
                <p>Wage: {val.description}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="New Wage"
                  onChange={(event) => setEdited(event.target.value)}
                />
                <button
                  onClick={() => {
                    updateBook(val.id);
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    deleteBook(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
