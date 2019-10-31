import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//import Avatar from "@material-ui/core/Avatar";
//import MultipleSelect from "./playerChip";
//import Box from "@material-ui/core/Box";
//import TextField from "@material-ui/core/TextField";

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

export default function ManagersTeam(props) {
  const classes = useStyles();
  let counter = 1;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableBody>
            {props.playerList.length > 0 &&
              props.playerList.map(plyr => (
                <TableRow
                  key={plyr.id + plyr.playerName}
                  style={{ height: "30", padding: "0", nmargin: "0" }}
                >
                  <TableCell
                    align="left"
                    style={{
                      height: "20",
                      width: "0",
                      padding: "0",
                      nmargin: "0"
                    }}
                  >
                    {counter++}
                  </TableCell>
                  <TableCell align="left">{plyr.playerName}</TableCell>
                  <TableCell align="left">
                    {plyr.points == null ? 0 : plyr.points}
                  </TableCell>
                  <TableCell align="right">{plyr.playerType}</TableCell>

                  <TableCell align="left">{plyr.isActive}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
