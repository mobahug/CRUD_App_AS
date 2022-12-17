import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  //updates
  const [newWage, setNewWage] = useState(0);

  //fetch
  const [employeeList, setEmployeeList] = useState([]);

  //sending values to the backend database
  const addEmployer = () => {
    Axios.post("http://localhost:3006/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      console.log("success");
    });
  };

  const updateEmployee = (id) => {
    Axios.put("http://localhost:3006/update", {
      wage: newWage,
      id: id,
    })
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3006/delete/${id}`)
  };

  useEffect(() => {
    Axios.get("http://localhost:3006/employees").then((response) => {
      setEmployeeList(response.data);
    });
  }, [employeeList]);

  return (
    <>
      <div className="App">
        <div className="information">
          <label>Name</label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
          <label>Age</label>
          <input
            type="number"
            onChange={(event) => setAge(event.target.value)}
          />
          <label>Country</label>
          <input
            type="text"
            onChange={(event) => setCountry(event.target.value)}
          />
          <label>Position</label>
          <input
            type="text"
            onChange={(event) => setPosition(event.target.value)}
          />
          <label>Wage</label>
          <input
            type="number"
            onChange={(event) => setWage(event.target.value)}
          />
          <button onClick={addEmployer}>Add</button>
          ---------------------------------------------------------
        </div>
        <button /* onClick={getEmployees} */>Show Employees</button>
      </div>
      <div className="employees">
        {employeeList.map((val, key) => {
          return (
            <div key={val.id} className="employee">
              <div>
                <h3>Employee: {val.name}</h3>
                <p>Age: {val.age}</p>
                <p>Country: {val.country}</p>
                <p>Position: {val.position}</p>
                <p>Wage: {val.wage}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="New Wage"
                  onChange={(event) => setNewWage(event.target.value)}
                />
                <button onClick={() => { updateEmployee(val.id) }}>Update</button>
                <button onClick={() => { deleteEmployee(val.id) }}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
