import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function RoomDetails() {
  const { id } = useParams(); 
  const [szobaFoglaltsagLista, setSzobaFoglaltsagLista] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/foglaltsag/${id}`)
      .then(response => setSzobaFoglaltsagLista(response.data))
      .catch(error => console.error("Hiba a szoba foglaltságának betöltésekor:", error));
  }, [id]);

  return (
    <div className="container">
      <h1 className="bg-fej">Szoba foglaltsága</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Vendég neve</th>
            <th>Érkezés</th>
            <th>Távozás</th>
          </tr>
        </thead>
        <tbody>
          {szobaFoglaltsagLista.length > 0 ? (
            szobaFoglaltsagLista.map(foglalasAdat => (
              <tr key={foglalasAdat.vnev}>
                <td>{foglalasAdat.vnev}</td>
                <td>{foglalasAdat.erk}</td>
                <td>{foglalasAdat.tav}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nincsenek foglalások.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoomDetails;
