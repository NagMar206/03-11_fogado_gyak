import { useEffect, useState } from "react";
import axios from "axios";
import FejlecKep from "../img/top.jpg";
import SzobaKep from "../img/ketagyas.jpg";
import Logo from "../img/logo.png";
import "../styles/fogado.css"; 


function Home() {
  const [szobakLista, setSzobakLista] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/szobak")
      .then(response => {
        console.log("Szobák listája:", response.data);
        setSzobakLista(response.data);
      })
      .catch(error => console.error("Hiba a szobák betöltésekor:", error));
  }, []);

  return (
    <div>
      {/* Fejléc kép */}
      <div className="fejlec">
        <img src={FejlecKep} alt="Fogadó fejléc" className="fejlec-kep"/>
      </div>

      {/* Tartalom */}
      <div className="bg-torzs container">
        <h1 className="bg-fej">Üdvözöl a Hét Törpe Fogadó!</h1>

        <div className="row">
          {/* Bal oldali oszlop - logó és szöveg */}
          <div className="col-md-6">
            <img src={Logo} alt="Napraforgós logó" className="logo"/>
            <h3>Napraforgós Nemzeti Tanúsító Védjegy célja</h3>
            <p>
              A falusi szálláshelyek Napraforgós Nemzeti Tanúsító Védjegye a FATOSZ által több mint tíz éve létrehozott, 
              és működtetett minősítési rendszer alapjaira épülve 2011 óta a minőségi falusi turizmus szimbóluma.
            </p>
          </div>

          {/* Jobb oldali oszlop - szoba kép */}
          <div className="col-md-6">
            <img src={SzobaKep} alt="Szoba belső" className="szoba-kep"/>
          </div>
        </div>

        {/* Szobák táblázat */}
        <h3>Falusi szálláshely fajtái</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Szoba neve</th>
              <th>Férőhely</th>
              <th>Pótágy</th>
            </tr>
          </thead>
          <tbody>
            {szobakLista.length > 0 ? (
              szobakLista.map(szobaAdat => (
                <tr key={szobaAdat.szazon}>
                  <td>{szobaAdat.sznev}</td>
                  <td>{szobaAdat.agy}</td>
                  <td>{szobaAdat.potagy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nincsenek elérhető szobák.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Extrák */}
        <h3>A hét törpe fogadó</h3>
        <ul>
          <li>Ruhásszekrény</li>
          <li>Saját fürdőszoba zuhanytálcával</li>
          <li>WC (fürdőszobával egyben)</li>
        </ul>

        <a href="https://falusiturizmus.eu/">Falusi Turizmus hivatalos oldala</a>
      </div>
    </div>
  );
}

export default Home;
