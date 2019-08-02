import React from 'react';

function About() {
    return (
        <div>
            <h2 className="all-heading">About the Book Store</h2>
            <p className='about-par'>
                The project is a single-page web application created using React.js library for the user interface and a local server built using Node.js and MongoDB for the back-end.
            </p>
            <p className='about-par'>
                The Admin of the app creates a collection of books. He can edit or delete each available book.  
            </p>
            <p className='about-par'>
                The logged in users can buy any of the available books. They can also view their profile with the books they have bought.
            </p>
            <p className='about-par'>
                The guest users can only view the books and their details.
            </p>
        </div>
    )
}

export default About;
