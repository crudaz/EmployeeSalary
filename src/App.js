import React, { useState, useEffect } from "react";

import useFetch from "./components/UseFetch";
import CustomTable from "./components/CustomTable";

import { TextField, Button, CircularProgress } from "@material-ui/core";
import "./App.scss";

function App() {
  const [userFetch, setUserFetch] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState(null);

  const urlEmployees = "http://localhost:4000/employees";
  const res = useFetch(urlEmployees, {});

  useEffect(() => {
    setUserFetch(res.response);
    setUsers(res.response);
  }, [res.response]);

  const getHourlySalary = (hourlySalary) => 120 * hourlySalary * 12;
  const getMontlySalary = (monthtlySalary) => monthtlySalary * 12;

  const getSalary = (current) => {
    let salary = 0;
    current.contractType.map((type) => {
      if (type === "hourly") {
        salary += getHourlySalary(Number(current.hourlySalary));
      }
      if (type === "mountly") {
        salary += getMontlySalary(Number(current.hourlySalary));
      }
    });
    return salary;
  };

  const handleClick = () => {
    const newListUser = userFetch.filter(
      (user) => Number(user.id) === Number(search)
    );

    if (newListUser.length > 0) {
      setUsers(newListUser);
    } else {
      search && search.length > 0 ? setUsers(newListUser) : setUsers(userFetch);
    }
  };

  const tableColumns = [
    "Name",
    "Contract Type",
    "Hourly Salary",
    "Monthly Salary",
    "Total Salay",
  ];

  return (
    <div className="App">
      {users ? (
        <>
          <div className="section">
            <TextField
              id="outlined-basic"
              label="Search Employee"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ maxLength: 12 }}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
              Get Employees
            </Button>
          </div>

          <CustomTable
            items={users}
            columns={tableColumns}
            handleSalary={getSalary}
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default App;
