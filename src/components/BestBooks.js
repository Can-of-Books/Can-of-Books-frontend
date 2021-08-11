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

            <Carousel fade>
                {this.state.books.length &&
                    this.state.books.map(book =>
                        <Carousel.Item>
                            <img  style={{ width: '20rem', height: '40rem'}} 
                                className="d-block w-100"
                                src={book.img_url}
                                alt={book.title}
                            />
                            <Carousel.Caption style={{color:'red'}}>
                                <h1>{book.title}</h1>
                                <h5>{book.status}</h5>
                                <p>{book.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                    )}

            </Carousel>

        )
    }
}

export default withAuth0(BestBooks);