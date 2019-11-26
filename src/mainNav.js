import React, { Component } from "react";
import Playerlist from "./playerlist.js";
import Card from "./cardAuction.js";
import Box from "@material-ui/core/Box";
import Select from "react-select";
import data from "./players.json";
import MultipleSelect from "./playerChip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import SportsCricketSharpIcon from "@material-ui/icons/SportsCricketSharp";
import SimpleTable from "./tableplayers";
import { Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
//import ManagersTeam from "./mangersTeam";
import ManagersTeam from "./mangersTeamReadonly";
import mgrTeamData from "./mgrteamData.json";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
//import Button from "@material-ui/core/Button";

import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from "@material-ui/icons/Menu";

class mainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      playersSelected: 0,
      runningTotal: 0,
      managerName: "",
      emailId: "",
      teamPoints: 0,
      teamRank: 0,
      showTeamPlayers: true,
      teamId: this.props.match.params.teamId,
      useJson: true
    };
  }
  getteamPlayers(playerData, playerType) {
    return (
      playerData &&
      playerData
        .filter(a => {
          if (a.playerType === playerType) {
            return a;
          } else if (playerType === "All") {
            return a;
          }
        })
        .sort(function(a, b) {
          return a.id - b.id;
        })
    );
  }

  componentDidMount() {
    //var teamId = this.props.match.params.teamId;
    if (this.state.useJson) {
      let tD = mgrTeamData.filter(a => {
        if (a.userDetailsId === Number(this.props.match.params.teamId)) {
          return a;
        }
      })[0];
      let temptwith400 = tD.teamPoints + 400;
      let formatedteamptwith400 = "(" + tD.teamPoints + "+400)";
      let teamPts =
        this.props.match.params.teamId > 9
          ? temptwith400 + formatedteamptwith400
          : tD.teamPoints;
      let activePlayers = tD.teamPlayersOutputs.filter(p => {
        return p.isActive === true;
      });
      let tv = activePlayers.reduce(function(sum, item) {
        return (sum = sum + item.playerValue);
      }, 0);
      let teamPlayerlist = [];
      let batsmans = this.getteamPlayers(tD.teamPlayersOutputs, "Batsman");
      batsmans.map(a => {
        teamPlayerlist.push(a);
      });
      let ar = this.getteamPlayers(tD.teamPlayersOutputs, "AllRounder");
      ar.map(a => {
        teamPlayerlist.push(a);
      });
      //teamPlayerlist.push(ar);
      let kr = this.getteamPlayers(tD.teamPlayersOutputs, "WicketKeeper");
      kr.map(a => {
        teamPlayerlist.push(a);
      });

      let bowler = this.getteamPlayers(tD.teamPlayersOutputs, "Bowler");
      bowler.map(a => {
        teamPlayerlist.push(a);
      });
      //teamPlayerlist.push(bowler);

      this.setState({
        playerList: teamPlayerlist,
        // teamPlayerlist.length !== 0 ? teamPlayerlist : tD.teamPlayersOutputs,
        managerName: tD.managerName,
        teamPoints: teamPts,
        teamRank: tD.teamRank,
        teamName: tD.teamName,
        runningTotal: tv
      });
    } else {
      axios
        .get(
          "https://localhost:44360/userteam/" + this.props.match.params.teamId
        )
        .then(res => {
          console.log(res.data);
          var teamdata = res.data;
          let temptwith400 = teamdata.teamPoints + 400;
          let formatedteamptwith400 = "(" + teamdata.teamPoints + "+400)";
          let teamPts =
            this.props.match.params.teamId > 9
              ? temptwith400 + formatedteamptwith400
              : teamdata.teamPoints;
          this.setState({
            playerList: teamdata.teamPlayersOutputs,
            managerName: teamdata.managerName,
            teamPoints: teamPts,
            teamRank: teamdata.teamRank,
            teamName: teamdata.teamName
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  calcuateTeamValue() {
    var total = this.state.playerList.reduce(function(sum, item) {
      return (sum = sum + item.playerValue);
    }, 0);
    return total;
  }
  calculateTeamTotal(player, playerNo, deletePlayer, oldPlayer) {
    var player = { ...player, PlayerNumber: playerNo };
    var playerLst = this.state.playerList;
    var op = playerLst.filter(a => a.oldPlayerListId === player.id);
    var np = playerLst.filter(a => a.playerListId === player.id);
    var oldPlayerIndex = playerLst.indexOf(op[0]) + 1;
    var playerItem = playerLst[playerNo - 1];
    if (op.length === 1 && oldPlayerIndex === playerNo) {
      playerLst = playerLst.filter(a => {
        if (a.oldPlayerListId === player.id) {
          a.playerListId = player.id;
          a.playerValue = player.playerValue;
          a.modified = false;
          a.error = false;
        }
        return a;
      });
    } else if (op.length >= 1 || np.length >= 1) {
      var npPlyr = np[0];
      var dupPlyr = op[0];
      playerLst = playerLst.filter(a => {
        if (
          a.oldPlayerListId === playerItem.oldPlayerListId &&
          ((dupPlyr && dupPlyr.oldPlayerListId === player.id) ||
            (npPlyr && npPlyr.playerListId === player.id))
        ) {
          a.playerListId = player.id;
          a.playerValue = player.playerValue;
          a.error = true;
          a.modified = false;
        }
        return a;
      });
    } else {
      playerLst = playerLst.filter(a => {
        if (
          a.oldPlayerListId === playerItem.oldPlayerListId &&
          a.oldPlayerListId !== player.id
        ) {
          a.playerListId = player.id;
          a.playerValue = player.playerValue;
          a.modified = true;
          a.error = false;
        }
        return a;
      });
    }

    //var existPlayers = playerLst.filter(a => a.playerListId !== oldPlayer.id);
    // if (deletePlayer !== true) {
    //   existPlayers.push(player);
    // }
    // if (deletePlayer === true) {
    //   existPlayers.push(player);
    // }

    var total = playerLst
      .filter(a => {
        return a.isActive === true;
      })
      .reduce(function(sum, item) {
        return (sum = sum + item.playerValue);
      }, 0);
    var playerCount = playerLst.length;
    this.setState({
      playerList: playerLst,
      playersSelected: playerCount,
      runningTotal: total
    });
  }

  handleClick() {
    axios({
      method: "post",
      url: "https://localhost:44360/UserTeam/" + this.state.teamId,
      data: this.state.playerList
    }).then(function(response) {
      console.log(response.data);
    });
  }
  handleUpdateClick() {
    axios({
      method: "put",
      url: "https://localhost:44360/UserTeam/" + this.state.teamId,
      data: this.state.playerList
    }).then(function(response) {
      console.log(response.data);
    });
  }
  refresrefreshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            {/* <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h5">Team Details</Typography>
            <Box display="flex" flexWrap="nowrap" justifyContent="flex-end">
              <Link
                onClick={() => {
                  //console.log("onClick");
                  window.location.reload();
                }}
                href="#"
              >
                <Typography
                  variant="h6"
                  style={{
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    color: "#fff"
                  }}
                >
                  Refresh
                </Typography>
              </Link>
              <Link to={`/teams`} href="#">
                <Typography
                  variant="h6"
                  style={{
                    paddingRight: "20px",
                    color: "#fff"
                  }}
                >
                  Back to Ranking
                </Typography>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
        {/* <b>Welcome to MHCC Fantasy Winter League</b> */}
        <Box display="flex" flexWrap="nowrap" justifyContent="center" p={0}>
          <Grid>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              p={0}
            >
              {/* <Typography variant="h4">Team Details</Typography> */}
            </Box>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              //justifyContent="center"
              p={0}
            >
              <TextField
                id="standard-read-only-input"
                label="Manager/TeamName"
                value={this.state.managerName + " / " + this.state.teamName}
                InputProps={{
                  readOnly: this.state.showTeamPlayers
                }}
                variant="outlined"
                margin="normal"
              />
              {this.state.showTeamPlayers === true ? (
                <Box>
                  <TextField
                    id="standard-read-only-input"
                    label="Total Team Points"
                    value={this.state.teamPoints}
                    InputProps={{
                      readOnly: true
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
              ) : (
                <TextField
                  id="standard-read-only-input"
                  label="Team Name"
                  value={this.state.teamName}
                  InputProps={{
                    readOnly: this.state.showTeamPlayers
                  }}
                />
              )}
            </Box>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              p={-2}
            >
              {this.state.showTeamPlayers === true ? (
                <TextField
                  id="standard-read-only-input"
                  label="Team Rank"
                  value={this.state.teamRank}
                  InputProps={{
                    readOnly: true
                  }}
                  variant="outlined"
                  margin="normal"
                />
              ) : (
                // <TextField
                //   id="standard-read-only-input"
                //   label="Transfers Left"
                //   value={3}
                //   InputProps={{
                //     readOnly: true
                //   }}
                // />
                <TextField
                  id="standard-read-only-input"
                  label="Player Selected"
                  value={this.state.playersSelected}
                  InputProps={{
                    readOnly: true
                  }}
                  margin="normal"
                />
              )}
              <TextField
                error={this.state.runningTotal > 1000 ? true : false}
                id="standard-read-only-input"
                label="Total Team Value"
                variant="outlined"
                helperText={
                  this.state.runningTotal > 1000
                    ? "Total Value Exceeding 1000"
                    : ""
                }
                value={this.state.runningTotal}
                InputProps={{
                  readOnly: true,
                  color:
                    this.state.runningTotal > 1000 ? "primary" : "secondary"
                }}
                margin="normal"
              />
              {/* {this.state.showTeamPlayers === true ? (
                <TextField
                  id="standard-read-only-input"
                  label="Total Team Points"
                  value={this.state.teamPoints}
                  InputProps={{
                    readOnly: true
                  }}
                />
              ) : (
                <TextField
                  id="standard-read-only-input"
                  label="Total Points"
                  value={this.state.runningTotal}
                  InputProps={{
                    readOnly: true
                  }}
                />
              )} */}
            </Box>
            <Box style={{ maxHeight: "90%", overflow: "auto" }}>
              <ManagersTeam
                {...this.props}
                calculateTeamTotal={this.calculateTeamTotal.bind(this)}
                playerList={this.state.playerList.filter(a => {
                  return a.isActive === true;
                })}
              />
              <Typography variant="h5">Substitued Players</Typography>
              <ManagersTeam
                {...this.props}
                calculateTeamTotal={this.calculateTeamTotal.bind(this)}
                playerList={this.state.playerList.filter(a => {
                  return a.isActive === false;
                })}
              />
            </Box>
            {/* <Box style={{ maxHeight: "90%", overflow: "auto" }}>
              <SimpleTable
                {...this.props}
                calculateTeamTotal={this.calculateTeamTotal.bind(this)}
              />
            </Box> */}
            {/* {this.state.showTeamPlayers === true ? (
              <Box style={{ maxHeight: 400, overflow: "auto" }}>
                <ManagersTeam
                  {...this.props}
                  calculateTeamTotal={this.calculateTeamTotal.bind(this)}
                  playerList={this.state.playerList}
                />
              </Box>
            ) : (
              <Box style={{ maxHeight: "90%", overflow: "auto" }}>
                <SimpleTable
                  {...this.props}
                  calculateTeamTotal={this.calculateTeamTotal.bind(this)}
                />
              </Box>
            )} */}
          </Grid>
        </Box>
        {this.state.showTeamPlayers === false ? (
          <Box
            display="flex"
            flexWrap="nowrap"
            justifyContent="space-around"
            p={-2}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleUpdateClick.bind(this)}
            >
              Update
            </Button>
          </Box>
        ) : null}
      </div>
    );
  }
}

export default mainNav;
