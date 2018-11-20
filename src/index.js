import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { App } from "./App";
import game from "./store/reducers/game";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/css/main.css";

const rootReducer = combineReducers({
  game: game
});

// Redux Chrome Devtool Extension
// const composeEnhancers =
//   process.env.NODE_ENV === "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = createStore(rootReducer, applyMiddleware(thunk));

const appShell = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(appShell, document.getElementById("root"));
registerServiceWorker();
