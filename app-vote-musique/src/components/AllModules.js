import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi'; // Importation de votre instance Axios personnalisée
import { useNavigate } from 'react-router-dom';

function AllModules() {
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllModules = async () => {
            try {
                const response = await axiosApiInstance.get('/modules');
                setModules(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des modules:", error);
                // Gérer l'erreur
            }
        };

        fetchAllModules();
    }, []);

    const handleViewDetails = (moduleId) => {
        navigate(`/modules/${moduleId}`);
    };

    return (
        <div>
            <h3>Tous les Modules</h3>
            <ul>
                {modules.map((module) => (
                    <li key={module._id}>
                        {module.module} - Créé le: {new Date(module.created_at).toLocaleDateString()}
                        <button onClick={() => handleViewDetails(module._id)}>Voir Détails</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllModules;
