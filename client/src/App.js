import React from "react";
import { Provider } from "react-redux";
import store from "./Store";

import AppRouter from "./AppRouter";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}
export default App;
