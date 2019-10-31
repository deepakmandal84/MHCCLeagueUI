import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import playerDataJson from "./players.json";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "./cardAuction.js";
import { getThemeProps } from "@material-ui/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

export default function MultipleSelect(props) {
  const classes = useStyles();
  //const [playerData, setPlayerData] = React.useState(null);
  const [playerData, setPlayerData] = React.useState([]);
  const [player, setValues] = React.useState({
    playerName: "",
    id: "",
    points: ""
  });
  React.useEffect(() => {
    if (props.useJson) {
      setPlayerData(playerDataJson);
    } else {
      axios
        .get("https://localhost:44360/PlayerList/all")
        .then(res => {
          console.log(res.data);
          setPlayerData(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  const names =
    playerData &&
    playerData.filter(a => {
      if (a.playerType === props.PlayerType) {
        return a;
      } else if (props.PlayerType === "All") {
        return a;
      }
    });
  //const [personName, setPersonName] = React.useState([]);

  const getAvtaar = () => {
    if (props.PlayerType === "Batsman") {
      return "B";
    } else if (props.PlayerType === "Bowler") {
      return "W";
    } else if (props.PlayerType === "AllRounder") {
      return "A";
    } else {
      return "P";
    }
  };

  const handleChange = event => {
    //setPersonName(event.target.value);
    const plyr = names.filter(a => a.playerName === event.target.value)[0];

    const a = 11;

    setValues({
      ...player,
      name: plyr.playerName,
      id: plyr.id,
      playerValue: plyr.points
    });
    props.calculateTotal(plyr, props.PlayerNo);
  };

  const handleDelete = () => {
    //setPersonName({});
    setValues({});
    props.calculateTotal(null, props.PlayerNo, true);
  };

  const handleClick = () => {
    alert("You clicked the Chip.");
  };

  return (
    <Box display="flex" flexWrap="nowrap" justifyContent="space-between">
      <Select value={player.name} onChange={handleChange}>
        {names &&
          names.map(name => (
            <MenuItem key={name.id} value={name.playerName}>
              {name.playerName + "---" + name.points}{" "}
            </MenuItem>
          ))}
      </Select>
      {player && player.playerName && (
        <Chip
          //icon={<SportsBaseballIcon />}
          label={player.points}
          onDelete={handleDelete}
          color="primary"
        />
      )}
    </Box>
  );
}
