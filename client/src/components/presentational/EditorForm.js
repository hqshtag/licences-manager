import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import validator from "../../utils/validator";
import apiActions from "../../actions/apiActions";
import layoutActions from "../../actions/layoutActions";

class EditorForm extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    let { _id, client, licence, meta } = props.data;
    this.state = {
      id: _id,
      licenceCode: licence,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address ? client.address : "",
      state: client.state ? client.state : "",
      zip: client.zip ? client.zip : "",
      country: client.country ? client.country : "",
      numberPosts: meta.numberPosts,
      duration: meta.duration,
      isValid: true
    };
    //console.log(this.state);
  }

  handleChange = e => {
    const { name, value } = e.target;
    const errorKey = name + "Error";
    this.setState({
      [name]: value,
      [errorKey]: ""
    });
    //console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("jwt-token");
    const { dispatch } = this.props;
    const { _id } = this.props.data;
    const {
      name,
      phone,
      email,
      address,
      state,
      country,
      zip,
      numberPosts,
      duration
    } = this.state;
    const client = {
      name,
      phone,
      email,
      address,
      state,
      country,
      zip
    };

    const meta = { numberPosts, duration };

    for (let key in client) {
      if (!client[key]) {
        client[key] = undefined; //removing empy fields
      }
    }
    const data = { client, meta };
    dispatch(apiActions.updateLicence(token, _id, data));
    this.closeEditor();
  };

  closeEditor = () => {
    const { dispatch } = this.props;
    dispatch(layoutActions.closeEditor());
  };

  validateFields = () => {
    const values = this.state;

    values.id = undefined;
    values.licenceCode = undefined;
    values.isValid = undefined;
    for (let key in values) {
      if (!values[key]) {
        values[key] = undefined; //removing empy fields
      }
    }

    const valid = validator.validateEditorFields(values);
    if (valid === true) {
      this.setState({
        isValid: true
      });
    } else {
      let field = valid //the valid will return '"field" must have ....' we remove the '"' and get
        .split("") // the field by id
        .filter(elem => {
          return elem !== '"';
        })
        .join("")
        .split(" ")[0];
      let key = field + "Error";
      this.setState({
        [key]: valid,
        isValid: false
      });
      //console.log(this.state);
    }
  };

  render() {
    const values = this.state;
    return (
      <div>
        <Paper align="center" style={{ margin: 50, padding: 20 }}>
          <Typography align="center" variant="caption">
            #{this.props.data._id}
          </Typography>
          <br />
          <Typography align="center" variant="h6">
            {this.props.data.licence}
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Name:
            <TextField
              required
              name="name"
              style={{ marginLeft: 10 }}
              value={values.name}
              onChange={this.handleChange}
              helperText={values.nameError}
              error={values.nameError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Email:
            <TextField
              required
              name="email"
              style={{ marginLeft: 10 }}
              value={values.email}
              onChange={this.handleChange}
              helperText={values.emailError}
              error={values.emailError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Phone:
            <TextField
              required
              name="phone"
              style={{ marginLeft: 10 }}
              value={values.phone}
              onChange={this.handleChange}
              helperText={values.phoneError}
              error={values.phoneError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Address:
            <TextField
              name="address"
              style={{ marginLeft: 10 }}
              value={values.address}
              onChange={this.handleChange}
              helperText={values.addressError}
              error={values.addressError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            State:
            <TextField
              name="state"
              style={{ marginLeft: 10 }}
              value={values.state}
              onChange={this.handleChange}
              helperText={values.stateError}
              error={values.stateError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Country:
            <TextField
              name="country"
              style={{ marginLeft: 10 }}
              value={values.country}
              onChange={this.handleChange}
              helperText={values.countryError}
              error={values.countryError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Zip-code:
            <TextField
              name="zip"
              style={{ marginLeft: 10 }}
              value={values.zip}
              onChange={this.handleChange}
              helperText={values.zipError}
              error={values.zipError ? true : false}
            />
          </Typography>
          <br />
          <Typography style={{ marginRight: 8 }} variant="h6">
            Number of Posts:
            <TextField
              name="numberPosts"
              type="number"
              inputProps={{
                min: 1
              }}
              value={values.numberPosts}
              onChange={this.handleChange}
              helperText={values.numberPostsError}
              error={values.numberPostsError ? true : false}
            />{" "}
          </Typography>
          <br />
          <Typography style={{ margin: 5 }} variant="h6">
            Duration (days):
            <TextField
              name="duration"
              type="number"
              inputProps={{
                min: 30
              }}
              value={values.duration}
              onChange={this.handleChange}
              helperText={values.durationError}
              error={values.durationError ? true : false}
            />
          </Typography>
          <div style={{ padding: 20 }} onMouseOver={this.validateFields}>
            <Button color="secondary" onClick={this.closeEditor}>
              cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect()(EditorForm);
