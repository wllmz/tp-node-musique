import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi'; // Assurez-vous que le chemin est correct
import { useParams } from 'react-router-dom';
import MusicVotesList from './MusicVotesList'; 

function MusicList() {
    const [musics, setMusics] = useState([]);
    const { moduleId } = useParams();

    useEffect(() => {
        const fetchMusics = async () => {
            try {
                const response = await axiosApiInstance.get(`/${moduleId}/musics`);
                setMusics(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des musiques:", error);
            }
        };

        fetchMusics();
    }, [moduleId]);

    return (
        <div>
            <ul>
            <h2>Liste des Musiques</h2>
                {musics.map((music) => (
                    <li key={music._id}>
                        {music.title} - Artiste: {music.author} 
                        <MusicVotesList musicId={music._id} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MusicList;
