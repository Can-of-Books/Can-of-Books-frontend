import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = withAuth0();
  return !isAuthenticated && <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;