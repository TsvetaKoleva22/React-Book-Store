import React, { Fragment } from 'react';
import SingleBook from '../components/SingleBook'

function AllBooks(props) {
    let availableBooks = props.books.filter(b => !b.buyer);

    if (!availableBooks.length) {
        return <h1>No books available</h1>
    }

    return (
        <Fragment>
            <h1 className="all-heading">All Books Available</h1>
            <div className="row">
                <div className="card-deck space-top single-bookstyle" style={{ margin: '0px 40px' }}>
                    {
                        availableBooks.map(book => <SingleBook book={book} key={book._id} />)
                    }

                </div>
            </div>
        </Fragment>
    )
}

export default AllBooks;