import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Carousel, Button } from "react-bootstrap";
import FormModal from "./FormModal";
import UpdateFormModal  from "./UpdateFormModal";

export class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      displayAddModal: false,
      displayUpdateModal: false,
      bookObject: {},

    };
  }

  componentDidMount = () => {
    const userEmail = this.props.auth0.user.email;

    axios
      .get(`${process.env.REACT_APP_SERVER}/books?email=${userEmail}`)
      .then((axiosResponse) => {
        this.setState({
          books: axiosResponse.data,
        });
      })
      .catch((error) => alert(error));
  };

  handelDisplayModal = () => {
    this.setState({ displayAddModal: !this.state.displayAddModal });
  }

  handelDisplayUpdateModal = (bookObject) => {
    this.setState({
      displayUpdateModal: !this.state.displayUpdateModal,
      bookObject: bookObject
    });
  }

 

  handelAddBookForm = (e) => {

    e.preventDefault();
    this.handelDisplayModal(); // hide the modal after form submission

    const body = {
      
      email: this.props.auth0.user.email, 
      title: e.target.bookName.value,
      description: e.target.bookDes.value,
      status: e.target.bookStatus.value,
      img_url: e.target.Image.value,};
    
    axios.post(`${process.env.REACT_APP_SERVER}/book`, body).then(axiosResponse => {
      this.state.books.push(axiosResponse.data);
      this.setState({
        books: this.state.books
      });
    }).catch(error => alert(error));
  }

  handelDeleteBook = (bookId) => {
    axios.delete(`${process.env.REACT_APP_SERVER}/book/${bookId}`).then(res => {
      if (res.data.ok === 1) {
        const tempbookObj = this.state.books.filter(book => book._id !== bookId);
        this.setState({
          books: tempbookObj
        });
      }
    }).catch(error => alert(error))
  }

  updatebooksArrOfObjectState = (newbooksArr) => {
    this.setState({ book: newbooksArr });
  }

  render() {
    return (
      <div>
        <Button variant="secondary" onClick={() => this.handelDisplayModal()}>
          Add a Book
        </Button>
        <FormModal
          show={this.state.displayAddModal}
          handelDisplayModal={this.handelDisplayModal}
          handelSubmitForm={this.handelAdBookForm}
        />
        
        {
          this.state.displayUpdateModal &&
          <UpdateFormModal
            show={this.state.displayUpdateModal}
            handleDisplayModal={this.handelDisplayUpdateModal}
            newBookArr={this.state.bookObject}
            updatebooks={this.updatebooksArrOfObjectState}
            booksArr={this.state.books}
          />
        }
        
        <br />
        <br />

        <Carousel fade>
          {this.state.books.length &&
            this.state.books.map((book) => (
              <Carousel.Item>
                <img
                  style={{ width: "20rem", height: "40rem" }}
                  className="d-block w-100"
                  src={book.img_url}
                  alt={book.title}
                />
                <Carousel.Caption style={{ color: "red" }}>
                  <h1>{book.title}</h1>
                  <h5>{book.status}</h5>
                  <p>{book.description}</p>
                  <Button variant="outline-danger" style={{zindex:"1"}} onClick={() => this.handelDeleteBook(book._id)}>Delete Book</Button>
                  <br />
<Button variant="outline-dark" onClick={() => this.handelDisplayUpdateModal(book)}>
                          Update Book
                        </Button>
                </Carousel.Caption>

              </Carousel.Item>
              
            ))}
        </Carousel>
      </div>
    );
  }
}

export default withAuth0(BestBooks);
