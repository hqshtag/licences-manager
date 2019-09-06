import {
  OPEN_ID_DIALOG,
  CLOSE_ID_DIALOG,
  TOGGEL_DRAWER,
  ONLY_REG_SECTION,
  ONLY_VIEW_SECTION,
  DEFAULT_DASHBOARD_DISPLAY,
  DISPLAY_EDITOR,
  CLOSE_EDITOR
} from "../constants/layoutConstants";

const closeIdDialog = () => {
  return {
    type: CLOSE_ID_DIALOG
  };
};

const openIdDialog = option => {
  return {
    type: OPEN_ID_DIALOG,
    payload: {
      option
    }
  };
};

const toggelDrawer = () => {
  return {
    type: TOGGEL_DRAWER
  };
};

const displayRegisterSectionOnly = () => {
  return {
    type: ONLY_REG_SECTION
  };
};

const displayViewSectionOnly = () => {
  return {
    type: ONLY_VIEW_SECTION
  };
};

const defaultDisplay = () => {
  return {
    type: DEFAULT_DASHBOARD_DISPLAY
  };
};

const displayEditor = id => {
  return {
    type: DISPLAY_EDITOR,
    payload: {
      id
    }
  };
};

const closeEditor = () => {
  return {
    type: CLOSE_EDITOR
  };
};

const layoutActions = {
  toggelDrawer,
  openIdDialog,
  closeIdDialog,
  displayRegisterSectionOnly,
  displayViewSectionOnly,
  defaultDisplay,
  displayEditor,
  closeEditor
};

export default layoutActions;
