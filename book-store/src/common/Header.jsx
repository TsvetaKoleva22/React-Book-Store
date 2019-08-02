import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <nav className="navbar-menu">
                <Link to="/about">About BookStore</Link>
                <Link to="/" className="active" aria-current="page">Home</Link>
                <Link to="/all">All Books</Link>
                {
                    props.username ?
                        (<Fragment>
                            {
                                props.isAdmin ?
                                    <Link to="/create">Create Book</Link>
                                    : <Link to="/mybooks">My Books</Link>
                            }
                            <Link to="/logout">Logout</Link>
                        </Fragment>)
                        :
                        (<Fragment>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </Fragment>)
                }

            </nav>
        </header>
    )

}

export default Header;
