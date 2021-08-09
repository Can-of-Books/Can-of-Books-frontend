import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.css";
import BestBooks from "./BestBooks";
import Profile from "./Profile";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";
import BestBooksList from "./components/BestBooksList";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>

          <Header />
          <Switch>
            <Route exact path="/">
              {
                !isAuthenticated
                  ? <Login />
                  : <BestBooks />
              }
            </Route>
            <Route exact path="/profile">
              {
                isAuthenticated &&
                <Profile />
              }
            </Route>
            <Route>
              {
                isAuthenticated &&
                <BestBooksList />
              }
            </Route>
          </Switch>
          <Footer />

        </Router>
      </>
    );
  }
}

export default withAuth0(App);
