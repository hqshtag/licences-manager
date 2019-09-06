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

const initialState = {
  displayEditor: false,
  drawerOpen: false,
  dialogOpen: false,
  dialogOption: "",
  onlyRegisterSection: false,
  onlyViewSection: true
};

export default function layoutReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_ID_DIALOG:
      return {
        ...state,
        dialogOpen: true,
        dialogOption: action.payload.option
      };
    case CLOSE_ID_DIALOG:
      return {
        ...state,
        dialogOpen: false,
        dialogOption: ""
      };
    case TOGGEL_DRAWER:
      let { drawerOpen } = state;
      return {
        ...state,
        drawerOpen: !drawerOpen
      };
    case ONLY_REG_SECTION:
      return {
        ...state,
        onlyRegisterSection: true,
        onlyViewSection: false,
        displayEditor: false
      };
    case ONLY_VIEW_SECTION:
      return {
        ...state,
        onlyRegisterSection: false,
        onlyViewSection: true,
        displayEditor: false
      };
    case DEFAULT_DASHBOARD_DISPLAY:
      return {
        ...initialState,
        ...state
      };
    case DISPLAY_EDITOR:
      return {
        ...state,
        licenceId: action.payload.id,
        displayEditor: true,
        onlyRegisterSection: false,
        onlyViewSection: false
      };
    case CLOSE_EDITOR:
      return {
        ...state,
        licenceId: undefined,
        displayEditor: false,
        onlyViewSection: true,
        onlyRegisterSection: false
      };
    default:
      return state;
  }
}
