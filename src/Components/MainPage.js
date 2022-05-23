import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Select from "./shared/Select";

export default function MainPage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setMovies(response.data);
        });
    }, []);

    return(
        <>
            <Select>
                <p>Selecione o filme</p>
            </Select>
            <List>
                {movies.map((movie, index) => <Movies id={movie.id} title={movie.title} poster={movie.posterURL} key={index}/>)}
            </List>
        </>
    );
}

function Movies(props) {
    return(
        <Movie>
            <Link to={`/sessoes/${props.id}`}><img src={props.poster} alt={`Poster de ${props.title}`} /></Link>
        </Movie>
    );
}

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 11px;
    width: 320px;
    margin: 0 auto;
    `;

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