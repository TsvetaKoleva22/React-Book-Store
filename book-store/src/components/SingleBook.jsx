import React from 'react';
import { Link } from 'react-router-dom';


function SingleBook(props) {
    return (
        <div className="card col-6 text-center border-secondary mb-3">
            <div className="card-header">
                <h5>{props.book.title}</h5>
            </div>
            <div className="card-body">
                <img className="card-img-top card-image single-image" src={props.book.imageUrl} alt={props.book.title} />
                <p className="card-text desc-par">{props.book.description}</p> 
            </div>
            <div className="card-footer text-white bg-secondary mb-3">
                <h5>Price: {props.book.price} USD</h5> 
            </div>
            <div className="card-footer">
                <Link type="button" className="btn btn-primary float-center btn-md" to={'/details/' + props.book._id}>Details</Link>
            </div>
        </div>
    )
}

export default SingleBook;
