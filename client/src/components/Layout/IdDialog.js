import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import apiAction from "../../actions/apiActions";
import layoutAction from "../../actions/layoutActions";

class IdDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      id: value
    });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { id } = this.state;
    const token = localStorage.getItem("jwt-token");
    if (this.props.option === "Delete") {
      dispatch(apiAction.removeLicence(token, id));
      dispatch(layoutAction.closeIdDialog());
      this.setState({
        id: ""
      });
    } else {
      dispatch(layoutAction.displayEditor(id));
      dispatch(layoutAction.closeIdDialog());
      this.setState({
        id: ""
      });
    }
  };

  validId = id => id.match(/^[0-9a-fA-F]{24}$/i);
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.close()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Enter licence ID</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Enter the licence's Id that you want to {this.props.option}
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              label="ID"
              type="email"
              value={this.state.id}
              error={!this.validId(this.state.id)}
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close()} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              disabled={!this.validId(this.state.id)}
              color="primary"
            >
              {this.props.option === "Delete"
                ? "Confirm Delete"
                : "Continue to Editor"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(IdDialog);
