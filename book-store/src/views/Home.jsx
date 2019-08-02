import React from 'react';
import Welcome from '../components/Welcome';
import LatestSection from '../components/LatestSection';

function Home(props) {
    return (
        <main>
            <div className="welcome-wrapper">
                <Welcome username={props.username} />
                <LatestSection books={props.books}/>
            </div>
        </main>
    )
}

export default Home;
