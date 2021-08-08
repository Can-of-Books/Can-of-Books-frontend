import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import "./Login.css";
import LogoutButton from "./LogoutButton";

class Login extends React.Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Log Out</Card.Title>
          <Card.Text>Click Below to Log Out</Card.Text>
          {/* TODO: add a `LogoutButton` component here that will log the user in with Auth0 */}

          <LogoutButton />
        </Card.Body>
      </Card>
    );
  }
}

export default Login;
