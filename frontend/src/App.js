import React, {useState, useEffect } from 'react';

import api from './services/api';

import Header from './components/Header';

import './App.css';



function App() {
    const [ projects, setProjects ] = useState([]);

    useEffect(() => {
        api.get('/projects').then( response => {
            setProjects(response.data)
        })
    }, []);

    async function handleAddProject () {
        const response = await api.post('projects', {
            'title': `Front-end com ReactJs ${Date.now()}`,
            'owner': 'Maria Luisa'
        }); 

        const project = response.data;

        setProjects([... projects, project]);
    }

    return (
        <>
            <Header />
            <ul>
                { projects.map( project => <li key={project.id}>{project.title}</li>) }
            </ul>

            <button type="button" onClick={handleAddProject}>Add a new project</button>
        </>
    );
}

export default App;