import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            genres: '',
            author: '',
            description: '',
            price: '',
            imageUrl: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        this.props.createBook(this.state);
    }

    render() {
        if (this.props.hasFetched) {
            return <Redirect to="/" />
        }
        return (
            <div className="form-wrapper">
                <h1 className="all-heading">Create New Book</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter book title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" name="author" placeholder="Enter book author" 
                        value={this.state.author} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="genres">Genres</label>
                        <input type="text" id="genres" name="genres" placeholder="Genres, separated by commas" 
                        value={this.state.genres} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" placeholder="Enter book description" 
                        value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image</label>
                        <input type="text" id="imageUrl" name="imageUrl" placeholder="Enter book image URL" 
                        value={this.state.imageUrl} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" placeholder="Enter book price" 
                        value={this.state.price} onChange={this.handleChange}/>
                    </div>

                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}

export default CreateBook;
