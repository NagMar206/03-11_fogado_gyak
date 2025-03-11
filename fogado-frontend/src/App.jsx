import {BrowserRouter as Router, Routes, Route } from "react-router-dom";         //BrowserRouter átnevezve Router-re, Routes útvonalak csoportosítása, Route pedig adott oldal
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomInfo from "./pages/RoomInfo";
import Header from "./components/Header";

function App() {
  return (
    <Router>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/szobak" element={<Rooms />} />
    <Route path="/szobak/:id" element={<RoomInfo />} />
  </Routes>
</Router>
  );
}

export default App;