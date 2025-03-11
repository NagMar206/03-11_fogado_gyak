import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RoomDetails() {
    const {id} = useParams();
    const {foglaltsag, setFoglaltsag} = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/foglaltsag/${id}`)
        .then (response => setFoglaltsag(response.data))
        .catch(error => console.error("Hiba a foglaltság betöltésekor:", error));
    }, [id])

    return(
        <div className="container">
            <h1 className="bg-fej">Szoba foglaltsága</h1>
            <ul>
                {foglaltsag.length > 0 ? (
                foglaltsag.map(f => (
                <li key={f.vnev}>
                    {f.vnev}: {f.erk} - {f.tav}
                </li>
                ))
            ) : (
            <p>Nincsenek foglalások.</p>
         )}
            </ul>
        </div>
    )
}

export default RoomDetails;