import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import validator from "../../utils/validator";
class FormMetaFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      numberPostsError: "",
      durationError: "",
      isValid: false
    };
  }
  handleChange = e => {
    let { name, value } = e.target;

    if (value) value = parseInt(value);
    this.setState({
      [name]: value
    });
  };

  validateFields = () => {
    const values = this.state;

    const valid = validator.validateMetaFields(
      values.numberPosts,
      values.duration
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
    const meta = {
      numberPosts: values.numberPosts,
      duration: values.duration
    };
    return (
      <React.Fragment>
        <Typography variant="overline">Licence config</Typography>
        <br />
        <TextField
          name="numberPosts"
          label="Number of posts"
          type="number"
          inputProps={{
            min: 1
          }}
          value={values.numberPosts}
          onChange={this.handleChange}
          helperText={values.numberPostsError}
          error={values.numberPostsError ? true : false}
        />{" "}
        <br />
        <TextField
          name="duration"
          label="Duration (days)"
          type="number"
          inputProps={{
            min: 30
          }}
          value={values.duration}
          onChange={this.handleChange}
          helperText={values.durationError}
          error={values.durationError ? true : false}
        />
        <br />
        <Divider />
        <div
          style={{ marginTop: 22, padding: 10 }}
          onMouseOver={this.validateFields}
        >
          <Button onClick={this.props.prev} color="primary">
            back
          </Button>
          <Button
            variant="contained"
            onClick={() => this.props.next(meta)}
            color="primary"
            disabled={!values.isValid}
          >
            next
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default FormMetaFields;
