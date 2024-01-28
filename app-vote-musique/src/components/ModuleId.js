import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi';
import { useParams } from 'react-router-dom';

function ModuleDetails() {
    const [module, setModule] = useState(null);
    const { moduleId } = useParams();

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await axiosApiInstance.get(`/modules/${moduleId}`);
                setModule(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération du module:", err);
            }
        };

        fetchModule();
    }, [moduleId]);

    // Vérifiez si les données du module sont chargées avant de les afficher
    if (!module) {
        return <div>Chargement du module...</div>;
    }

    return (
        <div>
            <h2>Détails du Module</h2>
            <p>ID du Module: {module._id}</p> {/* Affichez l'ID du module */}
            <p>Titre du Module: {module.module}</p> {/* Affichez le titre du module */}
            {/* Autres détails du module ici */}
        </div>
    );
}

export default ModuleDetails;
