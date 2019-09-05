import React from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import FormConfirmation from "./FormSteps/FormConfirmation";
import FormSuccess from "./FormSteps/FormSuccess";
import FormReqFields from "./FormSteps/FormReqFields";
import FormOptionalFields from "./FormSteps/FormOptionalFields";
import FormMetaFields from "./FormSteps/FormMetaFields";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Divider from "@material-ui/core/Divider";
import formActions from "../actions/formActions";
import apiActions from "../actions/apiActions";
import layoutActions from "../actions/layoutActions";

class RegisterLicenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      submited: false,
      licence: props.licence
    };
    //console.log(props);
    //console.log(this.state);
    // console.log(this.state.formData);
  }

  //Porceed to next step and save data to redux store
  nextStep = data => {
    const { step } = this.state;
    if (data) {
      const { dispatch } = this.props;
      dispatch(formActions.saveFields(data));
    }
    if (step < 5) {
      this.setState({
        step: step + 1
      });
    }
  };

  prevStep = () => {
    const { step } = this.state;
    if (step >= 1) {
      this.setState({
        step: step - 1
      });
    }
  };

  finish = () => {
    const { dispatch } = this.props;
    this.setState({
      step: 1
    });
    dispatch(formActions.resetFields());
    this.displayViewOnly();
  };

  displayViewOnly = () => {
    const { displayViewSectionOnly } = layoutActions;
    const { dispatch } = this.props;
    dispatch(displayViewSectionOnly());
  };

  getCurrentStepDisplay(step) {
    switch (step) {
      case 1:
        return (
          <FormReqFields next={this.nextStep} data={this.props.required} />
        );

      case 2:
        return (
          <FormOptionalFields
            prev={this.prevStep}
            next={this.nextStep}
            data={this.props.optional}
          />
        );

      case 3:
        return (
          <FormMetaFields
            prev={this.prevStep}
            next={this.nextStep}
            data={this.props.meta}
          />
        );

      case 4:
        return (
          <FormConfirmation
            prev={this.prevStep}
            next={this.nextStep}
            data={this.props.licence}
            submit={this.handleSubmit}
          />
        );

      case 5:
        return <FormSuccess prev={this.prevStep} finish={this.finish} />;
      default:
        return null;
    }
  }

  getStepLabels() {
    return [
      "Register client information",
      "Optinal fields",
      "Licence settings",
      "Confirmation",
      "Finish"
    ];
  }
  handleClick = () => {
    const { dispatch } = this.props;
    const token =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZmYWY0M2FhMjk5ODIzM2M3YmY0NTQiLCJpYXQiOjE1Njc2MDM4MjcsImV4cCI6MTU2NzY5MDIyN30.FMcpSJP2k0o6z1pv6zyr_mwhs3LAvQh7e1xkosG_BvhdHFYXNrq__VxiabOr-of-Q_DcRa_-398c0f2m84VN8Tm0-af1gn2TX_xTp2q7XN7nfqd1Yj85UHdV0j_ayHkn3MCuqrW5k0MR-AMiqqeOycl4NZIWPvUCaYrwe4UtBrsSyKo6-t9Asvts1t66KUrLlyxv6jofLNUiOiQWmuh-I9_VobA2rKXU8yyijzubpN0Iiw_ek_ZwFeJK9mR9YVXsFsJvdY1E7Z8CXe8tLD2aqS3agOKZ0V9_cNxtqmVU1i8WJakOPuJwYmaAZwdVCCyciM3GAynEQy7TuP95-Y83Rg";
    dispatch(apiActions.getAllLicences(token));
  };

  handleSubmit = () => {
    const { licence, dispatch } = this.props;
    for (let key in licence.client) {
      if (!licence.client[key]) {
        licence.client[key] = undefined; //removing empy fields
      }
    }
    const token = localStorage["jwt-token"];

    dispatch(apiActions.createLicence(token, licence));
    this.nextStep();
  };

  render() {
    const formStyle = {
      padding: 12,
      height: 380
    };
    const { step } = this.state;
    const stepLabels = this.getStepLabels();
    const FormFields = this.getCurrentStepDisplay(step);
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <h1>Register a new licence</h1>

        <form>
          <Divider />
          <div style={formStyle}>{FormFields}</div>
        </form>
        <Divider />

        <Stepper style={{ margin: 35 }} activeStep={step - 1} alternativeLabel>
          {stepLabels.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    );
  }
}

const mapStateToProps = trueState => {
  const {
    form: {
      name,
      email,
      phone,
      password,
      address,
      state,
      country,
      zip,
      numberPosts,
      duration
    }
  } = trueState;
  const required = { name, email, phone, password };
  const optional = { address, state, country, zip };
  const meta = { numberPosts, duration };
  const licence = {
    client: {
      ...required,
      ...optional
    },
    meta: {
      ...meta
    }
  };
  const { api } = trueState;
  return {
    apiData: api,
    required,
    optional,
    meta,
    licence
  };
};

export default connect(mapStateToProps)(RegisterLicenceForm);
