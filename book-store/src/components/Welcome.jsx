import React from 'react';

function Welcome(props) {
    return (
        <div className="welcome">
            {props.username ?
                <h1>Welcome back to our book store, {props.username} !</h1>
                :
                <h1>Welcome to our book store!</h1>
            }
        </div>
    )
}

export default Welcome;

