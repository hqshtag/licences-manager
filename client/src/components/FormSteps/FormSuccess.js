import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

function FormSuccess(props) {
  //const { step, values, handleChange, nextStep, prevStep } = props;
  return (
    <React.Fragment>
      <Paper style={{ padding: 50 }}>
        <Typography variant="h4">
          Your request has been successfully sent to the server.
        </Typography>
        <Typography style={{ marginLeft: "60%" }} variant="h6">
          You will be notified soon.
        </Typography>
      </Paper>
      <div style={{ position: "relative", left: "38vw", top: 15 }}>
        <Button disabled color="primary">
          back
        </Button>
        <Button variant="contained" onClick={props.finish} color="secondary">
          Finish
        </Button>
      </div>
    </React.Fragment>
  );
}

export default FormSuccess;
