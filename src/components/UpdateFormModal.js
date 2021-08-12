import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export class UpdateFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.bookName.value,
      description: this.props.bookDes.value,
      status: this.props.bookStatus.value,
      img_url: this.props.Image.value,


    };
  }

  handelNameChange = (e) => this.setState({ title: e.target.value });
  handelDesChange = (e) => this.setState({ description: e.target.value });
  handelStatusChange = (e) => this.setState({ status: e.target.value });
  handelImageChange = (e) => this.setState({ img_url: e.target.value });

  handelSubmitForm = (e) => {
    e.preventDefault();
    const bookId = this.state.bookId;
    const body = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      img_url: this.state.img_url,
    };

    axios
      .put(`${process.env.REACT_APP_SERVER}/book/${bookId}`, body)
      .then((axiosResponse) => {

        const updatedBookArr = this.props.booksArr.map((book) => {

          if (book._id === bookId) {
            book.title = axiosResponse.data.books.title;
            book.description = axiosResponse.data.books.description;
            book.status = axiosResponse.data.books.status;
            book.img_url = axiosResponse.data.books.img_url;

            return book;
          }
          return book;
        });
        this.props.updateBooks(updatedBookArr);




        this.props.handelDisplayModal({});
      }).catch((error) => alert(error));
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handelDisplayModal}>
          <Modal.Header>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => this.handelSubmitForm(e)}>
              <Form.Group className="mb-3">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelNameChange(e)}
                  value={this.state.title}
                  type="text"
                  placeholder="Enter the books name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelDesChange(e)}
                  value={this.state.description}
                  type="text"
                  placeholder="Enter the books description"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>book Status</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelStatusChange(e)}
                  value={this.state.status}
                  type="text"
                  placeholder="Enter the book status "
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Book Image</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelImageChange(e)}
                  value={this.state.img_url}
                  type="text"
                  placeholder="Enter the image URL"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Book
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handelDisplayModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateFormModal;
