import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Box from "@material-ui/core/Box";
//import teamRankDataJson from "./teamRankData.json";
import playerDataJson from "./players.json";
import teamdJson from "./teamData.json";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";

//import Avatar from "@material-ui/core/Avatar";
//import MultipleSelect from "./playerChip";
//import Box from "@material-ui/core/Box";
//import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

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
    maxWidth: 450
  }
}));

export default function TeamRank(props) {
  const useJsonData = true;
  const classes = useStyles();
  const [teamRankData, setTeamRankData] = React.useState([]);

  React.useEffect(() => {
    let d = playerDataJson;
    let o = teamRankData;
    if (useJsonData) {
      setTeamRankData(teamdJson);
    } else {
      axios
        .get("https://localhost:44360/TeamRank")
        .then(res => {
          console.log(res.data);
          setTeamRankData(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  let counter = 1;
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
          <Typography variant="h4">MHCC Fantasy League Team Ranking</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box display="flex" flexWrap="nowrap" justifyContent="center" p={0}>
          <Grid>
            <Box style={{ overflow: "auto" }}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableBody>
                  {teamRankData.length > 0 &&
                    teamRankData.map(plyr => (
                      <TableRow
                        key={plyr.id + plyr.teamName}
                        style={{ height: "30", padding: "0", nmargin: "0" }}
                      >
                        <TableCell align="left">
                          <Link to={`/team/` + plyr.userDetailsId} href="#">
                            {plyr.teamRank}
                          </Link>
                        </TableCell>
                        <TableCell align="left">{plyr.teamName}</TableCell>

                        <TableCell align="left">{plyr.managerName}</TableCell>
                        <TableCell align="left">
                          {plyr.teamPoints == null ? 0 : plyr.teamPoints}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
