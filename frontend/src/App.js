import React from 'react';

import Header from './components/Header';


function App() {
    const projects = ['Desenvolvimento de App', 'Front-end'];

    return (
        <>
            <Header />
            <ul>
                { projects.map( project => <li key={project }>{project}</li>) }
            </ul>
        </>
    );
}

export default App;