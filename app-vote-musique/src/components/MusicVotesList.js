import React, { useEffect, useState, useRef } from 'react';
import axiosApiInstance from '../services/axiosApi';
import AuthService from '../services/AuthService';

function MusicVotesList({ musicId }) {
    const [votes, setVotes] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [userVote, setUserVote] = useState(null);
    const [newVote, setNewVote] = useState(null);
    const user = useRef(AuthService.getCurrentUser());

    useEffect(() => {
        fetchVotes();
    }, [musicId]);

    const fetchVotes = async () => {
        try {
            const response = await axiosApiInstance.get(`/votes/musics/${musicId}`);
            setVotes(response.data);
            calculateAverageRating(response.data);

            if (user.current) {
                const foundVote = response.data.find(vote => vote.user_id === user.current.id);
                setUserVote(foundVote);
                setNewVote(foundVote ? foundVote.rating : null);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des votes:", error);
        }
    };

    const calculateAverageRating = (votes) => {
        const totalRating = votes.reduce((acc, vote) => acc + vote.rating, 0);
        setAverageRating(votes.length > 0 ? totalRating / votes.length : 0);
    };

    const handleVote = async (rating) => {
        try {
            if (user.current && !userVote) {
                await axiosApiInstance.post(`/votes/musics/${musicId}`, { rating });
                fetchVotes();
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du vote :", error);
        }
    };

    const deleteVote = async () => {
        try {
            if (user.current && userVote) {
                await axiosApiInstance.delete(`/votes/${userVote._id}`);
                fetchVotes();
                setNewVote(null);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du vote :", error);
        }
    };

    const handleNewVoteChange = (event) => {
        setNewVote(parseInt(event.target.value, 10));
    };

    const updateVote = async () => {
        try {
            if (user.current && userVote) {
                await axiosApiInstance.put(`/votes/${userVote._id}`, { rating: newVote });
                fetchVotes();
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du vote :", error);
        }
    };

    return (
        <div class="container" >
    <h3 style={{ marginTop: '20px', marginBottom: '20px' }}>Votes pour la Musique</h3>

    {userVote ? (
        <div class="alert alert-info" >
            <p>Vous avez déjà voté dans ce module pour cette musique :</p>
            <p><strong>Votre vote : {userVote.rating} ★</strong></p>
            <button class="btn btn-danger" onClick={deleteVote}>Supprimer le vote</button>
            <div class="form-group mt-3">
                <label for="newVote">Modifier votre vote :</label>
                <select class="form-control" id="newVote" value={newVote} onChange={handleNewVoteChange}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star}>{star}</option>
                    ))}
                </select>
                <br></br>
                <button class="btn btn-success" onClick={updateVote}>Mettre à jour</button>
            </div>
        </div>
    ) : (
        <div>
            <div class="btn-group" role="group" aria-label="Vote">
                {[1, 2, 3, 4, 5].map(star => (
                    <button class="btn btn-success" key={star} onClick={() => handleVote(star)}>
                        {star} ★
                    </button>
                ))}
            </div>
            <p class="mt-2">Choisissez une étoile pour voter.</p>
        </div>
    )}

    <ul class="list-group mt-3" >
        {votes.map(vote => (
            <li class="list-group-item d-flex justify-content-between align-items-center" key={vote._id}  >
                Vote: {vote.rating} ★
                <span class="badge badge-primary badge-pill">{vote.user_id}</span>
            </li>
        ))}
    </ul>
    <p class="mt-3">Moyenne des votes : {averageRating.toFixed(2)} / 5</p>
</div>

    );
}

export default MusicVotesList;
