import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = withAuth0();
  return !isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;