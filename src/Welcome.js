import React from 'react';
import { Jumbotron } from "react-bootstrap";



class Welcome extends React.Component {
  render() {
    
    return (
     <div>
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      </Jumbotron>
      </div>
    );
  }
}

export default Welcome;
