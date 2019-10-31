import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
//import TeamPlayerList from './teamPlayersList.js';

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});
const useStyles1 = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const classes1 = useStyles1();

  const [values, setValues] = React.useState({
    playerList: props.PlayersList,
    curentPlayer: props.CurrentPlayer
  });
  const bull = <span className={classes.bullet}>•</span>;
  const handleclick = () => {
    alert(props.TeamName);
  };
  const getPlayerItems = () => {
    if (props.PlayersList != undefined) {
      return props.PlayersList;
    }
    let players = [];
    players.push("Srini");
    players.push("Suresh");
    players.push("Jassi");
    return players;
  };
  const addPlayerItems = playerName => {
    let playerList = values.PlayersList;
    playerList.push(playerName);
    setValues({
      ...values,
      PlayersList: playerList
    });
  };
  return (
    //let list = getPlayerItems();
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.TeamName}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab color="primary" aria-label="add" className={classes1.fab}>
          <AddIcon onClick={handleclick} />
        </Fab>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Bid
        </Button>
      </CardActions>
    </Card>
  );
}
