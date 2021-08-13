import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export class UpdateFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: this.props.newBookArr.value,
      bookDes: this.props.newBookArr.value,
      bookStatus: this.props.newBookArr.value,
      Image: this.props.newBookArr.value,
    };
  }

  handelNameChange = (e) => this.setState({ bookName: e.target.value });
  handelDesChange = (e) => this.setState({ bookDes: e.target.value });
  handelStatusChange = (e) => this.setState({ bookStatus: e.target.value });
  handelImageChange = (e) => this.setState({ Image: e.target.value });

  handelSubmitForm = (e) => {
    e.preventDefault();
    const bookId = this.state.bookId;
    const body = {
      title: this.state.bookName,
      description: this.state.bookDes,
      status: this.state.bookStatus,
      img_url: this.state.Image,
    };

    axios.put(`${process.env.REACT_APP_SERVER}/book/${bookId}`, body).then((axiosResponse) => {
        console.log("updated Book Data:  ", axiosResponse.data);

          
        const updatedbookArr = this.props.booksArr.map((book) => {
          if (book._id === bookId) {
            book.title = axiosResponse.data.title;
            book.description = axiosResponse.data.description;
            book.status = axiosResponse.data.status;
            book.img_url = axiosResponse.data.img_url;

            return book;
          }
          return book;
        });
        this.props.updatebooks(updatedbookArr);

        this.props.handelDisplayModal({});
      })
      .catch((error) => alert(error));
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handelDisplayModal}>
          <Modal.Header>
            <Modal.Title>Update book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => this.handelSubmitForm(e)}>
              <Form.Group className="mb-3">
                <Form.Label>book Name</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelNameChange(e)}
                  defaultValue={this.state.bookObject.bookName}
                  type="text"
                  placeholder="Enter the books name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>book Breed</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelDesChange(e)}
                  defaultValue={this.state.bookObject.bookDes}
                  type="text"
                  placeholder="Enter the books breed"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>book Image</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelImageChange(e)}
                  defaultValue={this.state.bookObject.Image}
                  type="text"
                  placeholder="Enter the image URL"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>book Status</Form.Label>
                <Form.Control
                  onChange={(e) => this.handelStatusChange(e)}
                  defaultValue={this.state.bookObject.bookStatus}
                  type="text"
                  placeholder="Enter the status URL"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update book
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateFormModal;
