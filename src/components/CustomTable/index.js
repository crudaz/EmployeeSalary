import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import PropTypes from "prop-types";

import "./styles.scss";

function CustomTable({ items, columns, handleSalary }) {
  return (
    <TableContainer component={Paper}>
      <Table className="customTable" aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.contractType}</TableCell>
                <TableCell align="right">{row.hourlySalary}</TableCell>
                <TableCell align="right">{row.monthlySalary}</TableCell>
                <TableCell align="right">{handleSalary(row)}</TableCell>
              </TableRow>
            ))
          ) : (
            <div>No Records!!</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomTable.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.array,
  handleSalary: PropTypes.func,
};

export default CustomTable;
