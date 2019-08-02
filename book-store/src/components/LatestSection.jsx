import React, { Fragment } from 'react';
import SingleBook from './SingleBook'

function LatestSection(props) {
    let availableBooks = props.books.filter(b => !b.buyer);

    if (!availableBooks.length) {
        return <h1>No books available</h1>
    }

    let booksToShow = availableBooks.slice(0);
    if (booksToShow.length > 4) {
        let maxLength = booksToShow.length - 4;
        booksToShow = booksToShow.slice(maxLength);
    }

    return (
        <Fragment>
            <h2>Our Latest Books:</h2>
            <div className="row">
                <div className="card-deck space-top single-bookstyle">
                    {
                        booksToShow.map(book => <SingleBook book={book} key={book._id} />)
                    }

                </div>
            </div>
        </Fragment>
    )
}

export default LatestSection;