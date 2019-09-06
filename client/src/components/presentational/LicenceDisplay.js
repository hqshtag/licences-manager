import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  button: {
    position: "relative",
    left: "50%",
    bottom: 20,
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(4)
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    minWidth: 275,
    maxWidth: 750,
    margin: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  cardActions: {
    position: "relative",
    left: "1%",
    top: 10
  },
  id: {
    fontSize: 12
  },
  name: {
    marginBottom: 1,
    fontSize: 24,
    fontWeight: 800,
    textTransform: "capitalize"
  },
  licence: {
    fontSize: 20,
    fontWeight: 420,
    paddingTop: 10,
    paddingBottom: 18,
    letterSpacing: 2,
    color: "#FFC621"
  },

  info: {
    letterSpacing: 2
  },
  meta: {
    margin: 8
  }
}));

function LicenceDisplay(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { _id, licence, client, meta } = props.data;
  const date = new Date(meta.creationDate);
  let day = date.getDate();
  let month = date.getMonth(); //Be careful! January is 0 not 1
  let year = date.getFullYear();

  let dateString = day + "/" + (month + 1) + "/" + year;

  return (
    <Card align="center" className={classes.card}>
      <CardContent>
        <Typography className={classes.id} color="textSecondary" gutterBottom>
          ID: {_id}
        </Typography>
        <Typography className={classes.name} variant="h5" component="h2">
          {client.name}
        </Typography>
        <Typography className={classes.info} color="textSecondary">
          Email: {client.email}
        </Typography>
        {client.phone ? (
          <Typography className={classes.info} color="textSecondary">
            Phone: {client.phone}
          </Typography>
        ) : null}
        <Typography className={classes.licence} color="textSecondary">
          {licence}
        </Typography>
        <Divider variant="inset" />
        <Typography variant="caption" component="p" className={classes.meta}>
          Number Of Posts:{meta.numberPosts} {bull} Created At: {dateString}
          {bull} Duration: {meta.duration} {bull} {meta.state}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => props.openEditor(_id)}
        >
          Edit
          <EditIcon className={classes.rightIcon}>send</EditIcon>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => props.remove(_id)}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}
export default LicenceDisplay;
