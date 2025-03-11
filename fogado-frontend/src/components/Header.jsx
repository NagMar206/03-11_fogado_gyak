import {Link} from "react-router-dom";                          //Ez helyettesíti a sima HTML link <a> használatát

function Header() {
    return(
        <nav>
            <ul>
                <li><Link to="/">Főoldal</Link></li>
                <li><Link to="/szobak">Szobák</Link></li>
            </ul>
        </nav>
    )
}

export default Header;