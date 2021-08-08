import React from 'react';
import Card from 'react-bootstrap/Card';
import LoginButton from "./LoginButton";
import { withAuth0 } from "@auth0/auth0-react";

class Login extends React.Component {

  render() {
    const { isAuthenticated } = this.props.Auth0;
    return(
      !isAuthenticated &&
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>       
        <LoginButton />
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(Login);
