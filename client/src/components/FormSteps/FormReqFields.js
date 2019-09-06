import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import validator from "../../utils/validator";

class FormReqFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: "",
      isValid: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    const errorKey = name + "Error";
    this.setState({
      [name]: value,
      [errorKey]: ""
    });
  };
  validateFields = () => {
    const values = this.state;

    const valid = validator.validateRequiredFields(
      values.name,
      values.email,
      values.phone,
      values.password
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
      //console.log(this.state);
    }
  };
  render() {
    const values = this.state;
    const required = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.password
    };
    return (
      <div>
        <React.Fragment>
          <Typography variant="overline" gutterBottom>
            Enter client information
          </Typography>
          <br />
          <TextField
            required
            label="Name"
            name="name"
            value={values.name}
            onChange={this.handleChange}
            helperText={values.nameError}
            error={values.nameError ? true : false}
          />{" "}
          <br />
          <TextField
            required
            label="Email"
            name="email"
            value={values.email}
            onChange={this.handleChange}
            helperText={values.emailError}
            error={values.emailError ? true : false}
          />{" "}
          <br />
          <TextField
            required
            name="phone"
            label="Phone"
            value={values.phone}
            onChange={this.handleChange}
            helperText={values.phoneError}
            error={values.phoneError ? true : false}
          />{" "}
          <br />
          <TextField
            required
            label="Password"
            name="password"
            value={values.password}
            onChange={this.handleChange}
            type="password"
            helperText={values.passwordError}
            error={values.passwordError ? true : false}
          />{" "}
          <br />
          <Divider />
          <div
            style={{ marginTop: 22, padding: 10 }}
            onMouseOver={this.validateFields}
          >
            <Button disabled color="secondary">
              back
            </Button>
            <Button
              variant="contained"
              onClick={() => this.props.next(required)}
              color="primary"
              disabled={!values.isValid}
            >
              next
            </Button>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default FormReqFields;
