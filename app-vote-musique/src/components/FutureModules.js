import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi'; // Importez votre instance Axios configurée

function FutureModules() {
    const [futureModules, setFutureModules] = useState([]);

    useEffect(() => {
        const fetchFutureModules = async () => {
            try {
                const response = await axiosApiInstance.get('/modules/futurs');
                setFutureModules(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des modules futurs:", error);
                // Gérer l'erreur
            }
        };

        fetchFutureModules();
    }, []);

    return (
        <div>
            <h3>Modules Futurs</h3>
            <ul>
                {futureModules.map((module) => (
                    <li key={module._id}>{module.title} - Expiration: {new Date(module.expiration_date).toLocaleDateString()}</li>
                ))}
            </ul>
        </div>
    );
}

export default FutureModules;
