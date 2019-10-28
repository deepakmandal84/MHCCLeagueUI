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
class mainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      playersSelected: 0,
      runningTotal: 0
    };
  }
  calculateTeamTotal(player, playerNo, deletePlayer) {
    var player = { ...player, PlayerNumber: playerNo };
    var playerLst = this.state.playerList;
    var existPlayers = playerLst.filter(a => a.PlayerNumber !== playerNo);
    if (deletePlayer !== true) {
      existPlayers.push(player);
    }

    var total = existPlayers.reduce(function(sum, item) {
      return (sum = sum + item.Value);
    }, 0);
    var playerCount = existPlayers.length;
    this.setState({
      playerList: existPlayers,
      playersSelected: playerCount,
      runningTotal: total
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
                //value={this.state.playersSelected}
              />
              {"     "}
              <TextField
                id="filled-email-input"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Box>
            <Box
              display="flex"
              flexWrap="nowrap"
              justifyContent="space-around"
              p={0}
            >
              <TextField
                id="standard-read-only-input"
                label="Player Selected"
                value={this.state.playersSelected}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
              />
              {"     "}
              <TextField
                id="standard-read-only-input"
                label="Total Points"
                value={this.state.runningTotal}
                margin="normal"
                InputProps={{
                  readOnly: true
                }}
              />
            </Box>
            <Box style={{ maxHeight: 400, overflow: "auto" }}>
              <SimpleTable
                {...this.props}
                calculateTeamTotal={this.calculateTeamTotal.bind(this)}
              />
            </Box>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default mainNav;
