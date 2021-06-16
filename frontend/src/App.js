import React from 'react';

import Header from './components/Header';

import './App.css';

import backgroundImg from './assets/img1.jpg'

function App() {
    const projects = ['Desenvolvimento de App', 'Front-end'];

    return (
        <>
            <Header />
            <img width={300} src={backgroundImg}/>
            <ul>
                { projects.map( project => <li key={project }>{project}</li>) }
            </ul>
        </>
    );
}

export default App;