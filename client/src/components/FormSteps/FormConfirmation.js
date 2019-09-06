import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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

function FormConfirmation(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let dateString = day + "/" + (month + 1) + "/" + year;
  const { client, meta } = props.data;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.name} variant="h5" component="h2">
            {client.name}
          </Typography>
          <Typography className={classes.info} color="textSecondary">
            Email: {client.email}
          </Typography>
          <Typography className={classes.info} color="textSecondary">
            Phone: {client.phone}
          </Typography>
          {client.address ? (
            <Typography className={classes.info} color="textSecondary">
              Address: {client.address}{" "}
            </Typography>
          ) : null}
          {client.country ? (
            <Typography className={classes.info} color="textSecondary">
              Country: {client.country}{" "}
            </Typography>
          ) : null}
          {client.state ? (
            <Typography className={classes.info} color="textSecondary">
              State: {client.state}{" "}
            </Typography>
          ) : null}
          {client.zip ? (
            <Typography className={classes.info} color="textSecondary">
              Zip Code: {client.zip}{" "}
            </Typography>
          ) : null}

          <Divider variant="inset" />
          <Typography variant="caption" component="p" className={classes.meta}>
            Number Of Posts: {meta.numberPosts} {bull} Created At: {dateString}
            {bull} Duration: {meta.duration} {bull} State: active
          </Typography>
        </CardContent>
      </Card>
      <div
        style={{
          position: "relative",
          left: "18vw",
          top: 15
        }}
      >
        <Button style={{ margin: 10 }} onClick={props.prev} color="primary">
          back
        </Button>
        <Button variant="contained" onClick={props.submit} color="primary">
          Confirme
        </Button>
      </div>
    </div>
  );
}

//on clicking confirm
/**
 *  - submited: true;
 *  - send POST request to the server;
//  *  - loadging: true
 *  - Response is going to be forwarded to success page (display the new licence);
*/
export default FormConfirmation;
