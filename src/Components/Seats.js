import axios from "axios";
import { Link } from "react-router-dom";
import Select from "./shared/Select";

export default function Seats() {
    return(
        <Select>
            <p>Selecione o(s) assentos</p>
        </Select>
    );
}