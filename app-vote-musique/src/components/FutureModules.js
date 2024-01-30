import React, { useEffect, useState } from 'react';
import axiosApiInstance from '../services/axiosApi'; 
import { useNavigate } from 'react-router-dom';

function FutureModules() {
    const [futureModules, setFutureModules] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchFutureModules = async () => {
            try {
                const response = await axiosApiInstance.get('/modules/futurs');
                setFutureModules(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des modules futurs:", error);

            }
        };

        fetchFutureModules();
    }, []);

    const handleViewDetails = (moduleId) => {
        navigate(`/modules/${moduleId}`);
    };


    return (
        <div className="container" style={{ marginTop: '50px' }}>
        <h3 className="text-center">Modules Futurs</h3>
        <div className="row">
            {futureModules.map((module) => (
                <div className="col-md-4" key={module._id}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">{module.module}</h5>
                            <p className="card-text">Expiration: {new Date(module.expiration_date).toLocaleString()}</p>
                            <button className="btn btn-success" onClick={() => handleViewDetails(module._id)}>Voir Détails</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
}

export default FutureModules;
