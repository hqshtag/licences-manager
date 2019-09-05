import React from "react";
import { connect } from "react-redux";
import apiActions from "../actions/apiActions";

import EditorForm from "./presentational/EditorForm";

class Editor extends React.Component {
  componentDidMount() {
    // console.log(this.props);
    const { dispatch, id } = this.props;
    const token = localStorage.getItem("jwt-token");
    if (id) {
      dispatch(apiActions.getLicence(token, id));
    }
  }
  render() {
    return (
      <div>
        {!this.props.loading ? (
          this.props.licence ? (
            <EditorForm data={this.props.licence} />
          ) : (
            "Loading..."
          )
        ) : (
          "Loading"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const id = state.layout.licenceId;
  const { licenceToEdit, loading } = state.api;

  return {
    loading,
    id,
    licence: licenceToEdit
  };
};

export default connect(mapStateToProps)(Editor);
