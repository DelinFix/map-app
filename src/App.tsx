import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomePage from "./pages/Home";


export default function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </Provider>
  );
}
