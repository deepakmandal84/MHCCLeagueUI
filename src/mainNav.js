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
import ManagersTeam from "./mangersTeam";

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
      showTeamPlayers: false
    };
  }
  componentDidMount() {
    axios
      .get("https://localhost:44360/userteam/7")
      .then(res => {
        console.log(res.data);
        var teamdata = res.data;
        this.setState({
          playerList: teamdata.teamPlayersOutputs,
          managerName: teamdata.managerName,
          teamPoints: teamdata.teamPoints,
          teamRank: teamdata.teamRank
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  calculateTeamTotal(player, playerNo, deletePlayer) {
    var player = { ...player, PlayerNumber: playerNo };
    var playerLst = this.state.playerList;
    var existPlayers = playerLst.filter(a => a.PlayerNumber !== playerNo);
    if (deletePlayer !== true) {
      existPlayers.push(player);
    }

    var total = existPlayers.reduce(function(sum, item) {
      return (sum = sum + item.points);
    }, 0);
    var playerCount = existPlayers.length;
    this.setState({
      playerList: existPlayers,
      playersSelected: playerCount,
      runningTotal: total
    });
  }

  handleClick() {
    axios({
      method: "post",
      url: "https://localhost:44360/UserTeam/7",
      data: this.state.playerList
    }).then(function(response) {
      console.log(response.data);
    });
  }

  render() {
    return (
      <div>
        <b>Welcome to MHCC Fantasy Winter League</b>
        <Box display="flex" flexWrap="nowrap" justifyContent="center" p={0}>
          <Grid>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              p={0}
            >
              <TextField
                id="standard-read-only-input"
                label="Manager Name"
                value={this.state.managerName}
                InputProps={{
                  readOnly: this.state.showTeamPlayers
                }}
              />
              {this.state.showTeamPlayers === true ? (
                <TextField
                  id="standard-read-only-input"
                  label="Team Rank"
                  value={this.state.teamRank}
                  InputProps={{
                    readOnly: true,
                    align: "right"
                  }}
                />
              ) : (
                <TextField
                  id="filled-email-input"
                  label="TeamName"
                  //type="email"
                  name="email"
                  autoComplete="email"
                />
              )}
            </Box>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              p={0}
            >
              {this.state.showTeamPlayers === true ? (
                <TextField
                  id="standard-read-only-input"
                  label="Transfers Left"
                  value={3}
                  InputProps={{
                    readOnly: true
                  }}
                />
              ) : (
                <TextField
                  id="standard-read-only-input"
                  label="Player Selected"
                  value={this.state.playersSelected}
                  InputProps={{
                    readOnly: true
                  }}
                />
              )}

              {this.state.showTeamPlayers === true ? (
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
              )}
            </Box>
            {this.state.showTeamPlayers === true ? (
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
            )}
          </Grid>
        </Box>
        {this.state.showTeamPlayers === true ? (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClick.bind(this)}
            >
              Create MyTeam
            </Button>
          </Box>
        ) : null}
      </div>
    );
  }
}

export default mainNav;
