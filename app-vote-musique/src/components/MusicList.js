import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi';
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
        <div class="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
    <h2 class="text-center" style={{ marginTop: '50px' }}>Liste des Musiques</h2>
    <ul class="list-group">
        {musics.map((music) => (
            <li class="list-group-item text-center d-flex align-items-center justify-content-center" key={music._id} style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div  style={{ padding: '50px' }}>
                <h5>{music.title} - Artiste: {music.author}</h5>
                <MusicVotesList musicId={music._id} />
            </div>
        </li>
        
        ))}
    </ul>
</div>

    );
}

export default MusicList;
