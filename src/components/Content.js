import React, { Component } from "react";
import { withAuth0  } from "@auth0/auth0-react";
import axios from "axios";

export class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount = () => {
    this.props.auth0
      .getIdTokenClaims()
      .then((tokenResponse) => {
        const jwt = tokenResponse.__raw;

        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          method: "get",
          baseURL: process.env.REACT_APP_SERVER,
          url: "/test",
        };

        axios(config)
          .then((axiosResponse) => {
            this.setState({
              user: axiosResponse.data,
            });
          })
          .catch((error) => alert(error));
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <p></p>
        {this.state.user.nickname && (
          <p>Data from Backend: {this.state.user.nickname}</p>
        )}
      </div>
    );
  }
}

export default withAuth0(Content);
