import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "./shared/Select";
import Footer from "./shared/Footer";
import ImageContainer from "./shared/ImageContainer";
import Session from "./Session";


export default function Sessions() {
    const { movieId } = useParams();
    const [sessionDays, setSessionDays] = useState([]);
    const [movieSession, setMovieSession] = useState({});

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then(response => {
            setSessionDays(response.data.days);
            setMovieSession(response.data);
        });
    }, [movieId]);
    
    return(
        <>
            <Select>
                <p>Selecione o horário</p>
            </Select>
            <List>
                {sessionDays.map((day, index) => <Session day={day} key={index} />)}
            </List>
            <Footer>
                <ImageContainer>
                    <img src={movieSession.posterURL} alt={`Poster de ${movieSession.title}`} />
                </ImageContainer>    
                <p>{movieSession.title}</p>
            </Footer>
        </>
    );
}

const List = styled.ul`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    margin-bottom: 117px;`;