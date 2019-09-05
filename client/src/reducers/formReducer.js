const SAVE_FIELDS = "SAVE_FIELDS";
const RESET_FORM = "RESET_FORM";
const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  zip: "",
  country: "",
  state: "",
  numberPosts: 1, //number of posts
  duration: 30 //number in days days
};

export default function formReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_FIELDS:
      return {
        ...state,
        ...action.payload
      };
    case RESET_FORM:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
