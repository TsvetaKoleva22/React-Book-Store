import React from 'react';

function MySingleBook(props) {
    return (
        <div className="card col-4 text-center border-secondary mb-3">
            <div className="card-header">
                <h5>{props.book.title}</h5>
            </div>
            <div className="card-body">
                <img className="card-img-top card-image single-image" src={props.book.imageUrl} alt={props.book.title} />
                <p className="card-text text-left desc-par">Author: {props.book.author}</p>                 
                <p className="card-text text-left desc-par">Description: {props.book.description}</p>
                <p className="card-text text-left desc-par">Genres: {props.book.genres}</p> 
            </div>
        </div>
    )
}

export default MySingleBook;
