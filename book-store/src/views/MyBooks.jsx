import React, { Fragment } from 'react';
import MySingleBook from '../components/MySingleBooks'


function MyBooks(props) {
    let myBooks = props.books.filter(b => b.buyer === sessionStorage.getItem('username'));
    return (
        <Fragment>
            <h2 className="all-heading">My Purchased Books</h2>
            <div className="container">
                <div>
                    <div className="card-deck space-top single-bookstyle" style={{ margin: '0px 40px' }}>
                        {
                            myBooks.length ?
                                myBooks.map(book => <MySingleBook book={book} key={book._id} />)
                                :
                                (<div className="sorry-h">
                                    <h2>Sorry, you have not bought any books yet...</h2>
                                    <h4>Hurry up and buy one now!</h4>
                                </div>)
                        }

                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default MyBooks;
