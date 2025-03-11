require("dotenv").config();                                                                     //Ha külön .env fájlban tárolnám az adatbázist, de ezt nem használnám. 
const express = require('express');                                                             //Backend API, HTTP szerver és API végpontok
const mysql = require("mysql2");                                                                //MySQL kapcsolódáshoz, adatbázis műveletek
const cors = require=('cors');                                                                  //Frontend-Backend kommunikáció





//Express alkalmazás létrehozás

const app = express();
const port = 5000;                                                                              //Az alkalmazás az 5000-es porton fog futni







//MySQL kapcsolat létrehozás

const db = mysql.createConnection({                                                             //MySQL kapcsolat
    host: "localhost",
    user: 'root',
    password: '',
    database:'fogado',
    port:'3307'                                                                                 //Port (3307)
})

db.connect((err) => {                                                                           //Adatbázis kapcsolat ellenőrzése
    if (err) {
        console.error("MySQL kapcsolati hiba: " + err.message);
    }
    else {
        console.log("Adatbázis kapcsolat létrehozva!");
    }
});





//API végpontok létrehozása - Alap Weboldal


app.get("/", (req, res) => {
    res.send("Szerver fut!")
});

app.get("/szobak", (req, res) => {
    const sql = "SELECT * FROM szobak";
    db.query(sql, (err,result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.json(result)
    })
})

//Szobák kihasználtsága

app.get("/foglaltsag", (req, res) => {
    const sql = `
    SELECT szobak.sznev,                                                                        
    COUNT(foglalasok.fsorsz) AS vendegek,
    SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendegejszakak
    FROM foglalasok
    JOIN szobak ON foglalasok.szoba = szobak.szazon
    GROUP BY szobak.sznev
    ORDER BY vendegejszakak ASC, vendegek ASC;
  `;
  db.query(sql, (err,result) => {
    if (err) {
        return res.status(500).json({error:err.message});
    }
    res.json(result);
  })
})

//szobak.sznev - szobák táblából
//COUNT & SUM  - foglalaások szobánként és hány éjszaka számolása
//FROM foglalasok - onnan jön ki az adat
//JOIN szobak ON - szobák és foglalások tábla összekapcsolása
//foglalasok.szoba = foglalasok.szazon - közös oszlop alapján kötjük össze
//GROUP BY - azonos szobákhoz köthető adatok, minden szoba csak 1x
//ORDER BY - Vendegejszakak növekvő sorrendben

//Kiválasztott szoba foglaltsága

app.get("/foglaltsag/:szobaId", (req, res) => {
    const {szobaid} = req.params;
    const sql = `
    SELECT vendegek.vnev, foglalasok.erk, foglalasok.tav
    FROM foglalasok
    JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz
    WHERE foglalasok.szoba = ?
    ORDER BY vendegek.vnev ASC
  `;
  db.query(sql, [szobaID], (err, result) => {
    if (err) {
        return res.status(500).json({error:err.message})
    }
    res.json(result);
  })
})

//foglalasok.vendeg tartalmazza a vsorsz-t (vendég azonosító)
//vendegek.vsorsz tartalmazza a vendégek valódi nevét amit ki kell íratni.
//WHERE foglalasok.szoba = ? - a backend adja át a kérdőjel értékét, 1-es szoba esetetén foglalasok.szoba = 1





//Szerver indítása

app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port} címen`);
});
