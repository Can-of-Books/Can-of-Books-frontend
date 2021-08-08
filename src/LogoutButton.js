import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { logout, isAuthenticated } = withAuth0();

  return (
    isAuthenticated &&
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;