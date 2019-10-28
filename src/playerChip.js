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
import playerData from "./players.json";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "./cardAuction.js";
import { getThemeProps } from "@material-ui/styles";

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
  const names = playerData.filter(a => {
    if (a.labelType === props.PlayerType) {
      return a;
    } else if (props.PlayerType === "All") {
      return a;
    }
  });
  //const [personName, setPersonName] = React.useState([]);
  const [player, setValues] = React.useState({
    name: "",
    id: "",
    playerValue: ""
  });
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
    const plyr = names.filter(a => a.label === event.target.value)[0];

    const a = 11;

    setValues({
      ...player,
      name: plyr.label,
      id: plyr.Id,
      playerValue: plyr.Value
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
        {names.map(name => (
          <MenuItem key={name.Id} value={name.label}>
            {name.label + "---" + name.Value}{" "}
          </MenuItem>
        ))}
      </Select>
      {player && player.name && (
        <Chip
          //icon={<SportsBaseballIcon />}
          label={player.playerValue}
          onDelete={handleDelete}
          color="primary"
        />
      )}
    </Box>
  );
}
