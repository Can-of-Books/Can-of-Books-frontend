import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Carousel, Button } from "react-bootstrap";
import FormModal from "./FormModal";
import UpdateFormModal from "./UpdateFormModal";

export class BestBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            displayAddModal: false,
            displayUpdateModal: false,
            updateBookObject: {},

        };
    }

    componentDidMount = () => {
        const userEmail = this.props.auth0.user.email;

        axios
            .get(`${process.env.REACT_APP_SERVER}/books?email=${userEmail}`)
            .then((axiosResponse) => {
                this.setState({
                    books: axiosResponse.data.books,
                });
            })
            .catch((error) => alert(error));
    };

    handleDisplayModal = () => {
        this.setState({ displayModal: !this.state.displayAddModal });
    };

    handleDisplayUpdateModal = (bookObject) => {
        this.setState({
            displayUpdateModal: !this.state.displayUpdateModal,
            updateBookObject: bookObject
        });
    }


    handleAddBookForm = (e) => {
        e.preventDefault();
        this.handleDisplayModal();

        const body = {
            title: e.target.bookName.value,
            description: e.target.bookDescription.value,
            status: e.target.bookStatus.value,
            img_url: e.target.bookImage.value,
          };

        axios
            .post(`${process.env.REACT_APP_SERVER}/book`, body)
            .then((axiosResponse) => {
                this.state.books.push(axiosResponse.data);
                this.setState({
                    books: this.state.books,
                });
            })
            .catch((error) => alert(error));
    };

    handleDeleteBook = (bookId) => {
        axios
            .delete(`${process.env.REACT_APP_SERVER}/book/${bookId}`)
            .then((res) => {
                if (res.data.ok === 1) {
                    const tempBookObj = this.state.books.filter((book) => book._id !== bookId);
                    this.setState({
                        books: tempBookObj,
                    });
                }
            })
            .catch((error) => alert(error));
    };


    updateBooksArrOfObjectState = (newBookArr) => {
        this.setState({ book: newBookArr });
    }

    render() {
        return (
            <div>
                <Button variant="secondary" onClick={() => this.handleDisplayModal()}>
                    Add a Book
                </Button>

                <FormModal
                    show={this.state.displayAddModal}
                    handleDisplayModal={this.handleDisplayModal}
                    handleSubmitForm={this.handleAddBookForm}
                />

                {
                    this.state.displayUpdateModal &&
                    <UpdateFormModal
                        show={this.state.displayUpdateModal}
                        handelDisplayModal={this.handelDisplayUpdateModal}
                        bookObject={this.state.updateBookObject}
                        updateBooks={this.updateBooksArrOfObjectState}
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
                                    <Button variant="outline-danger" style={{ zindex: "1" }} onClick={() => this.handleDeleteBook(book._id)}>Delete Book</Button>
                                    <br />
                                    <Button variant="outline-dark" onClick={() => this.handleDisplayUpdateModal(book)}>
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
