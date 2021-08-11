import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';


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
                books: axiosResponse.data.books
             
            });
            
        }).catch(error => alert(error));
    }


    render() {
        return (
            <div>
                {
                    this.state.books.length &&
                    this.state.books.map(book => {
                        return (

                            <Carousel fade>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src="holder.js/800x400?text="
                                        alt={book.title}
                                    />
                                    <Carousel.Caption>
                                        <h1>{book.title}</h1>
                                        <h5>{book.status}</h5>
                                        <p>{book.description}</p>
                                        <h3>{this.props.auth0.user.email}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>

                        )
                    })


                }
            </div>
        )
    }
}

export default withAuth0(BestBooks);