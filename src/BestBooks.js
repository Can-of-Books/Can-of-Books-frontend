import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';

class MyFavoriteBooks extends React.Component {
  render() {
    return(
      <div>
      {/* // <Jumbotron> */}
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
      {/* // </Jumbotron> */}
    </div>
    )
  }
}

export default MyFavoriteBooks;
