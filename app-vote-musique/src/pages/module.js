import React from 'react';
import Module_id from '../components/ModuleId';
import MusicList from '../components/MusicList';
import MusicSubmission from '../components/MusicSubmission';
import { useNavigate } from 'react-router-dom';


function Module() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Cela ramène l'utilisateur à la page précédente
    };


    return (
        <div style={{ margin: '5px' }}>
             <button onClick={goBack} className="btn btn-success">Retour</button>
            <Module_id />
            <MusicList />
            <MusicSubmission />
        </div>
    );
}

export default Module;
