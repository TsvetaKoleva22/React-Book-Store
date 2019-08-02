import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            imageUrl: '',
            author: '',
            description: '',
            price: '',
            genres: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let arr = this.props.books.filter(b => b._id.toString() === this.props.match.params.bookid.toString());
        let currBook = arr[0];
        this.setState({
            title: currBook.title,
            imageUrl: currBook.imageUrl,
            author: currBook.author,
            description: currBook.description,
            price: currBook.price,
            genres: currBook.genres
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
        this.props.editBook(this.state, id);
    }

    render() {
        if (this.props.hasFetched) {
            return <Redirect to="/" />
        }
        return (
            <div className="form-wrapper">
                <h1 className="all-heading">Edit Book</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" name="author" value={this.state.author} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genres">Genres</label>
                        <input type="text" id="genres" name="genres" value={this.state.genres} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image</label>
                        <input type="text" id="imageUrl" name="imageUrl" value={this.state.imageUrl} onChange={this.handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={this.state.price} onChange={this.handleChange} />
                    </div>
                    
                    <button type="submit">Edit</button>
                </form>
            </div>
        );
    }
}

export default Edit;
