import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi';

function MusicVotesList({ musicId }) {
    const [votes, setVotes] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await axiosApiInstance.get(`/votes/musics/${musicId}`);
                setVotes(response.data);

                // Calculer la moyenne des votes
                if (response.data.length > 0) {
                    const totalRating = response.data.reduce((acc, vote) => acc + vote.rating, 0);
                    setAverageRating(totalRating / response.data.length);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des votes:", error);
            }
        };

        fetchVotes();
    }, [musicId]);

    return (
        <div>
            <h3>Votes pour la musique</h3>
            <ul>
                {votes.map(vote => (
                    <li key={vote._id}>
                        Vote: {vote.rating}
                    </li>
                ))}
            </ul>
            {votes.length > 0 && (
                <p>Moyenne des votes : {averageRating.toFixed(2)} / 5</p>
            )}
        </div>
    );
}

export default MusicVotesList;
