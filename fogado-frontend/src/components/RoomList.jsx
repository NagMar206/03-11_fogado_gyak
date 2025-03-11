import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RoomList() {
  const [szobakLista, setSzobakLista] = useState([]); // API adatok tárolása

  useEffect(() => {
    axios.get("http://localhost:5000/szobak")
      .then(response => setSzobakLista(response.data))
      .catch(error => console.error("Hiba a szobák betöltésekor:", error));
  }, []);

  return (
    <div className="container">
      <h1 className="bg-fej">Szobáink</h1>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Szoba neve</th>
            <th>Férőhely</th>
            <th>Pótágy</th>
          </tr>
        </thead>
        <tbody>
          {szobakLista.map(szobaAdat => (
            <tr key={szobaAdat.szazon}>
              <td>
                <Link to={`/szobak/${szobaAdat.szazon}`}>
                  {szobaAdat.sznev}
                </Link>
              </td>
              <td>{szobaAdat.agy}</td>
              <td>{szobaAdat.potagy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoomList;
