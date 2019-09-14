import React from "react";
import { connect } from "react-redux";
import apiActions from "../actions/apiActions";
import layoutAction from "../actions/layoutActions";
import LicenceDisplay from "./presentational/LicenceDisplay";
import { Paper } from "@material-ui/core";

class ViewLicences extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem("jwt-token");
    dispatch(apiActions.getAllLicences(token));
  }

  deleteLicence = id => {
    const { dispatch } = this.props;
    const token = localStorage.getItem("jwt-token");
    dispatch(apiActions.removeLicence(token, id));
  };
  openEditor = id => {
    const { dispatch } = this.props;
    dispatch(layoutAction.displayEditor(id));
  };

  disableLicence = (id, payload) => {
    const { dispatch } = this.props;
    const token = localStorage.getItem("jwt-token");
    payload.state = "disabled";

    const data = {
      meta: {
        ...payload
      }
    };

    dispatch(apiActions.updateLicence(token, id, data));
  };
  enableLicence = (id, payload) => {
    const { dispatch } = this.props;
    const token = localStorage.getItem("jwt-token");
    payload.state = "active";
    const data = {
      meta: {
        ...payload
      }
    };

    dispatch(apiActions.updateLicence(token, id, data));
  };

  render() {
    let licences = [];
    if (this.props.licences) {
      licences = this.props.licences.map((licence, index) => {
        return (
          <LicenceDisplay
            data={licence}
            key={index}
            remove={this.deleteLicence}
            openEditor={this.openEditor}
            enable={this.enableLicence}
            disable={this.disableLicence}
          />
        );
      });
    }

    return (
      <Paper align="center" style={{ padding: 20, paddingBottom: "45vh" }}>
        {licences.sort()}
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  let { licences, loading } = state.api;

  return {
    licences,
    loading
  };
};

export default connect(mapStateToProps)(ViewLicences);
