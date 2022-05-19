import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Movies(props) {
    return(
        <Movie>
            <Link to={`/sessoes/:${props.id}`}><img src={props.poster} alt={`Poster de ${props.title}`} /></Link>
        </Movie>
    );
}

const Movie = styled.li`
    width: 145px;
    height: 209px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 129px;
        height: 193px;
    }`;