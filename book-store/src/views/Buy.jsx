import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class BuyBookConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            imageUrl: '',
            author: '',
            price: '',
            buyer: sessionStorage.getItem('username')
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        let arr = this.props.books.filter(b => b._id.toString() === this.props.match.params.bookid.toString());
        let currBook = arr[0];
        this.setState({
            title: currBook.title,
            imageUrl: currBook.imageUrl,
            author: currBook.author,
            price: currBook.price
        })
    }

    handleChange(event) {
        let key = event.target.name;
        let currValue = event.target.value;
        this.setState({
            [key]: currValue
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let id = this.props.match.params.bookid;
        this.props.buyBook(this.state, id);
    }

    render() {
        if (this.props.hasFetched) {
            return <Redirect to="/mybooks" />
        }
        return (
            <div className="form-wrapper">
                <h1 className="all-heading">Confirm Book Purchase</h1>
                <img src={this.state.imageUrl} alt={this.state.title} id="img-delete"/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input type="text" id="author" name="author" value={this.state.author} onChange={this.handleChange} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price USD:</label>
                        <input type="text" id="price" name="price" value={this.state.price} onChange={this.handleChange} disabled/>
                    </div>
                    <button type="submit">Confirm</button>
                </form>
            </div>
        );
    }
}

export default BuyBookConfirm;
