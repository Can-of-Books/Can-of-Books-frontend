import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'


export class BestBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
        };
    }

    componentDidMount = () => {
        const userEmail = this.props.auth0.user.email;

        axios.get(`${process.env.REACT_APP_SERVER}/books?email=${userEmail}`).then((axiosResponse) => {

            this.setState({
                books: axiosResponse.data
            });
        }).catch(error => alert(error));
    }


    render() {
        return (
            <div>
                <div>
                    <h1>My Best Books 📚</h1>
                </div>
                {
                    this.state.books.length &&

                    <div>

                        {
                            this.state.books.map(book => {
                                return (
                                    <Carousel variant="dark">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src="holder.js/800x400?text=Book List&bg=f5f5f5"
                                                alt={book.title}
                                            />
                                            <Carousel.Caption>
                                                <h1>{book.title}</h1>
                                                <h5>{book.status}</h5>
                                                <p>{book.description}</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    </Carousel>
                                )
                            })

                        }
                        <div>
                          <h3>{this.props.auth0.user.email}</h3>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default withAuth0(BestBooks);