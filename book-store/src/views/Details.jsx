import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function Details(props) {
    let arr = props.books.filter(b => b._id.toString() === props.match.params.bookid.toString());
    let currBook = arr[0];

    return (
        <div>
            <h2 className="all-heading">{currBook.title}</h2>
            <div className="card col-6 cont-details">
                <img className="img-details" src={currBook.imageUrl} alt={currBook.title} />

                <div className="card-body darken-first">
                    <p className="card-text"><span>Author:</span> {currBook.author}</p>
                    <p className="card-text"><span>Description:</span> {currBook.description}</p>
                    <p className="card-text"><span>Genres:</span> {currBook.genres}</p>
                </div>
                <div className="card-footer text-white bg-secondary mb-3 text-center">
                    <h5>Price: {currBook.price} USD</h5>
                </div>

                <div className="card-footer" style={{ textAlign: 'center' }}>
                    {
                        sessionStorage.getItem('username') && sessionStorage.getItem('isAdmin') === 'false' ?
                            <Link type="button" className="btn btn-success float-center btn-lg buy-btn" to={'/buy/' + currBook._id}>Buy Book</Link>
                            : null
                    }

                    {
                        sessionStorage.getItem('isAdmin') === 'true' ?
                            (<Fragment>
                                <Link type="button" to={'/edit/' + currBook._id} className="btn btn-warning float-center btn-md" style={{ marginRight: '40px' }} >Edit</Link>
                                <Link type="button" to={'/delete/' + currBook._id} className="btn btn-danger float-center btn-md" >Delete</Link>
                            </Fragment>)
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Details;
