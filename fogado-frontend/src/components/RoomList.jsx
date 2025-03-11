import { useEffect, useState } from "react";                    //API meghívása, meghívott adatok tárolása
import axios from "axios";                                      //HTTP kliens, API meghíváshoz
import {Link} from "react-router-dom";



function RoomList() {
    const{szobak, setSzobak} = useState([]);                        //szobak-ként jön Backend-ről, setSzobákkal adatfrissítés új értéknél, UseState üres tömb

    useEffect(() =>{
        axios.get("http://localhost:5000/szobak")                   //Backend szobák végpont meghívása
        .then(response => setSzobak(response.data))
        .catch(error => console.error("Hiba a szobák betöltésekor:", error));
    }, []);
    
    //Felületi megjelenítése a szobáknak
    
    return (
        <div>
            <h1>Szobák</h1>
            <ul>
                {szobak.map(szoba => (                              //map függvény minden szobára csinál egy 'li' elemet
                    <li key={szoba.szazon}>
                        <Link to={`/szobak/$(szoba.szazon)`}>
                            {szoba.sznev} ({szoba.agy} ágy, {szoba.potagy} pótágy)
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default RoomList;