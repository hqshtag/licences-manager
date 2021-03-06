import React from "react";
import { connect } from "react-redux";
import { SnackbarProvider } from "notistack";
//import { bindActionCreators } from "redux";

import layoutActions from "../actions/layoutActions";
import apiActions from "../actions/apiActions";

import Grid from "@material-ui/core/Grid";
//import Button from "@material-ui/core/Button";

import IdDialog from "./Layout/IdDialog";

import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import RegisterLicence from "./RegisterLicenceForm";
import ViewLicences from "./ViewLicences";
import LicenceEditor from "./LicenceEditor";
import "./styles/stylesheet.scss";

class Dashboard extends React.Component {
  openIdDialog = option => {
    const { openIdDialog } = layoutActions;
    const { dispatch } = this.props;
    dispatch(openIdDialog(option));
  };

  closeIdDialog = () => {
    const { closeIdDialog } = layoutActions;
    const { dispatch } = this.props;
    dispatch(closeIdDialog());
  };

  toggelDrawer = () => {
    const { toggelDrawer } = layoutActions;
    const { dispatch } = this.props;
    dispatch(toggelDrawer());
  };

  displayRegOnly = () => {
    const { displayRegisterSectionOnly } = layoutActions;
    const { dispatch } = this.props;
    dispatch(displayRegisterSectionOnly());
  };

  displayViewOnly = () => {
    const { displayViewSectionOnly } = layoutActions;
    const { dispatch } = this.props;
    dispatch(displayViewSectionOnly());
  };

  dashboardDisplay = () => {
    const { defaultDisplay } = layoutActions;
    const { dispatch } = this.props;
    dispatch(defaultDisplay());
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(apiActions.logout());
  };

  render() {
    let displayMod;
    if (this.props.displayEditor) {
      displayMod = <LicenceEditor />;
    } else {
      displayMod = this.props.onlyRegisterSection ? (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <RegisterLicence />
          </Grid>
        </Grid>
      ) : this.props.onlyViewSection ? (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <ViewLicences />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={6}>
            <RegisterLicence />
          </Grid>
          <Grid item xs={6}>
            <ViewLicences />
          </Grid>
        </Grid>
      );
    }
    return (
      <SnackbarProvider maxSnack={3}>
        <div>
          <Sidebar
            data={this.props.data}
            open={this.props.drawerOpen}
            toggler={() => this.toggelDrawer}
            dialogToggler={this.openIdDialog}
            displayViewOnly={this.displayViewOnly}
            displayRegOnly={this.displayRegOnly}
            defaultDisplay={this.dashboardDisplay}
          />
          <Navbar
            sideBarToggler={() => this.toggelDrawer}
            userLogout={() => this.logout}
          />
          <IdDialog
            open={this.props.dialogOpen}
            close={() => this.closeIdDialog}
            option={this.props.dialogOption}
          />

          {displayMod}
        </div>
      </SnackbarProvider>
    );
  }
}

const mapStateToProps = state => {
  const {
    dialogOpen,
    dialogOption,
    drawerOpen,
    onlyRegisterSection,
    onlyViewSection,
    displayEditor
  } = state.layout;
  const { error, result } = state.api;
  const { user, id } = state.auth;
  return {
    displayEditor,
    dialogOpen,
    dialogOption,
    drawerOpen,
    onlyRegisterSection,
    onlyViewSection,
    data: {
      admin: user,
      id
    },
    api: {
      error,
      result
    }
  };
};

export default connect(mapStateToProps)(Dashboard);

/**
 *  <Sidebar
          open={this.state.drawerOpen}
          toggler={() => this.toggelDrawer}
        />
        <Navbar
          sideBarToggler={() => this.toggelDrawer}
          userLogout={() => this.logout}
        />
 */
