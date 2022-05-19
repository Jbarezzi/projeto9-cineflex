import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Movies from "./Movies";
import Select from "./Select";

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

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 11px;
    width: 320px;
    margin: 0 auto;
    `;