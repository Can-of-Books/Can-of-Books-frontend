import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import BestBooks from "./BestBooks";
import Profile from "./Profile";
import Login from "./Login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>

          <Header />
          <Switch>
            <Route exact path="/">
              <BestBooks />
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />

        </Router>
      </>
    );
  }
}

export default App;
