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


    if (!module) {
        return <div>Chargement du module...</div>;
    }

    return (
<div class="container">
    <h2 class="text-center" style={{ marginTop: '50px' }}>Détails du Module</h2>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-body">
                    <p class="card-text"><strong>Titre du Module:</strong> {module.module}</p>
                </div>
            </div>
        </div>
    </div>
</div>

    );
}

export default ModuleDetails;
