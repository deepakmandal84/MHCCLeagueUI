import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MultipleSelect from "./playerChip";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    marginTop: theme.spacing(3),
    width: "100%",
    overflowX: "auto",
    marginBottom: theme.spacing(2)
  },
  table: {
    maxWidth: 650
  }
}));

export default function SimpleTable(props) {
  const classes = useStyles();
  const useJsonData = true;
  const calculateTotal = (playerObj, playerNos, deleteplayer) => {
    props.calculateTeamTotal(playerObj, playerNos, deleteplayer);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableBody>
            {[1, 2, 3, 4].map(value => (
              <TableRow
                key={value}
                style={{ height: "30", padding: "0", nmargin: "0" }}
              >
                <TableCell
                  align="left"
                  style={{
                    height: "10",
                    width: "0",
                    padding: "0",
                    nmargin: "0"
                  }}
                >
                  <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    p={0}
                  >
                    {value}
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={"batsman.jpg"}
                      style={{ width: "1", padding: "0", margin: "0" }}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <MultipleSelect
                    PlayerNo={value}
                    PlayerType="Batsman"
                    calculateTotal={calculateTotal}
                    useJson={useJsonData}
                  />
                </TableCell>
              </TableRow>
            ))}
            {[5, 6].map(value => (
              <TableRow key={value}>
                <TableCell
                  align="left"
                  style={{
                    height: "08",
                    width: "0",
                    padding: "0",
                    nmargin: "0"
                  }}
                >
                  <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    p={0}
                  >
                    {value}
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={"allrounder.jpg"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <MultipleSelect
                    PlayerType="AllRounder"
                    PlayerNo={value}
                    calculateTotal={calculateTotal}
                    useJson={useJsonData}
                  />
                </TableCell>
              </TableRow>
            ))}
            {[7].map(value => (
              <TableRow key={value}>
                <TableCell
                  align="left"
                  style={{
                    height: "08",
                    width: "0",
                    padding: "0",
                    nmargin: "0"
                  }}
                >
                  <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    p={0}
                  >
                    {value}
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={"anyplayer.jpg"}
                    />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <MultipleSelect
                    PlayerType="All"
                    PlayerNo={value}
                    calculateTotal={calculateTotal}
                    useJson={useJsonData}
                  />
                </TableCell>
              </TableRow>
            ))}
            {[8, 9, 10, 11].map(value => (
              <TableRow key={value}>
                <TableCell
                  align="left"
                  style={{
                    height: "20",
                    width: "0",
                    padding: "0",
                    nmargin: "0"
                  }}
                >
                  <Box
                    display="flex"
                    flexWrap="nowrap"
                    justifyContent="flex-start"
                    p={0}
                  >
                    {value}
                    <Avatar alt={`Avatar n°${value + 1}`} src={"bowling.jpg"} />
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <MultipleSelect
                    PlayerType="Bowler"
                    PlayerNo={value}
                    calculateTotal={calculateTotal}
                    useJson={useJsonData}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
