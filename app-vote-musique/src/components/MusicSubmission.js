import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axiosApiInstance from '../services/axiosApi';
import AuthService from '../services/AuthService';

function MusicManager() {
    const [musics, setMusics] = useState([]);
    const [newMusic, setNewMusic] = useState({ title: '', author: '' });
    const [editingMusic, setEditingMusic] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { moduleId } = useParams();
    const user = useRef(AuthService.getCurrentUser());

    useEffect(() => {
        fetchAllMusics();
    }, [moduleId]);

    const fetchAllMusics = async () => {
        try {
            const response = await axiosApiInstance.get(`/${moduleId}/musics`);
            setMusics(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des musiques:", error);
        }
    };

    const userHasPostedMusic = () => {
        return musics.some(music => music.user_id === user.current.id);
    };

    const handleAddMusic = async () => {
        if (!newMusic.title.trim() || !newMusic.author.trim()) return;

        try {
            await axiosApiInstance.post(`/${moduleId}/musics`, newMusic);
            setNewMusic({ title: '', author: '' });
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'une nouvelle musique:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewMusic({ ...newMusic, [e.target.name]: e.target.value });
    };

    const handleEditMusic = (music) => {
        setEditingMusic({ ...music });
        setIsEditing(true);
    };

    const submitMusicEdit = async () => {
        if (!editingMusic.title.trim() || !editingMusic.author.trim()) return;

        try {
            await axiosApiInstance.put(`/musics/${editingMusic._id}`, editingMusic);
            setEditingMusic(null);
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la musique:", error);
        }
    };

    const handleDeleteMusic = async (musicId) => {
        try {
            await axiosApiInstance.delete(`/musics/${musicId}`);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression de la musique:", error);
        }
    };

    return (
        <div className="container">
            <h3>Gestion des musiques pour le module </h3>
            {!userHasPostedMusic() && (
                <div>
                    <div className="form-group">
                        <label>Titre de la Nouvelle Musique :</label>
                        <input
                            type="text"
                            name="title"
                            value={newMusic.title}
                            onChange={handleInputChange}
                            placeholder="Entrez le titre de la musique"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Auteur de la Nouvelle Musique :</label>
                        <input
                            type="text"
                            name="author"
                            value={newMusic.author}
                            onChange={handleInputChange}
                            placeholder="Entrez l'auteur de la musique"
                            className="form-control"
                        />
                    </div>
                    <button onClick={handleAddMusic} className="btn btn-success">Ajouter une musique</button>
                </div>
            )}

{isEditing ? (
                <div>
                    <div className="form-group">
                        <label>Titre de la Musique :</label>
                        <input
                            type="text"
                            name="title"
                            value={editingMusic.title}
                            onChange={(e) => setEditingMusic({ ...editingMusic, title: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Auteur de la Musique :</label>
                        <input
                            type="text"
                            name="author"
                            value={editingMusic.author}
                            onChange={(e) => setEditingMusic({ ...editingMusic, author: e.target.value })}
                            className="form-control"
                        />
                    </div>
                    <button onClick={submitMusicEdit} className="btn btn-success"  style={{ margin: '20px' }}>Soumettre les modifications</button>
                    <button onClick={() => setIsEditing(false)} className="btn btn-success"  style={{ margin: '5px' }}>Annuler</button>
                </div>
            ) : (

                <ul className="list-group mt-3">
                {musics.filter(music => music.user_id === user.current.id).map((music) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={music._id}>
                        {music.title} par {music.author}
                        <div>
                            <button onClick={() => handleEditMusic(music)} className="btn btn-success" style={{ marginRight: '15px' }}>Modifier</button>
                            <button onClick={() => handleDeleteMusic(music._id)} className="btn btn-danger">Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        
            )}
        </div>
    );
}

export default MusicManager;
