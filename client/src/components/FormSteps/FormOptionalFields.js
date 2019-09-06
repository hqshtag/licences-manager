import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import validator from "../../utils/validator";

class FormOptionalFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      addressError: "",
      zipError: "",
      countryError: "",
      stateError: "",
      isValid: false,
      isSkipable: true
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    const errorKey = name + "Error";
    this.setState({
      [name]: value,
      [errorKey]: "",
      isSkipable: false
    });
  };

  validateFields = () => {
    const values = this.state;
    const valid = validator.validateOptionalFields(
      values.address,
      values.country,
      values.state,
      values.zip
    );

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
        [key]: valid
      });
    }
  };

  render() {
    const values = this.state;
    const optional = {
      address: values.address,
      zip: values.zip,
      country: values.country,
      state: values.state
    };
    return (
      <React.Fragment>
        <Typography variant="overline">Provide further details?</Typography>
        <br />
        <div onMouseOver={this.validateFields}>
          <TextField
            name="address"
            label="Address"
            value={values.address}
            onChange={this.handleChange}
            helperText={values.addressError}
            error={values.addressError ? true : false}
          />{" "}
          <br />
          <TextField
            name="zip"
            label="Zip"
            value={values.zip}
            onChange={this.handleChange}
            helperText={values.zipError}
            error={values.zipError ? true : false}
          />{" "}
          <br />
          <TextField
            name="country"
            label="Country"
            value={values.country}
            onChange={this.handleChange}
            helperText={values.countryError}
            error={values.countryError ? true : false}
          />{" "}
          <br />
          <TextField
            name="state"
            label="State"
            value={values.state}
            onChange={this.handleChange}
            helperText={values.stateError}
            error={values.stateError ? true : false}
          />{" "}
        </div>
        <br />
        <Divider />
        <div style={{ marginTop: 22, padding: 10 }}>
          <Button onClick={this.props.prev} color="primary">
            back
          </Button>
          <Button
            variant="contained"
            onClick={() => this.props.next(optional)}
            color="primary"
            disabled={!this.state.isSkipable && !values.isValid}
          >
            {this.state.isSkipable ? "skip" : "next"}
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default FormOptionalFields;
