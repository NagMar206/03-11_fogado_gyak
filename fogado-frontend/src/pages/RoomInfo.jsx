import {useParams} from "react-router-dom";

function RoomInfo() {
    const {id} = userParams(); //URL-ből ID érték
    return <div>Kiválasztott szoba: {id}</div>
}

export default RoomInfo;