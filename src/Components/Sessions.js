import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "./shared/Select";
import Footer from "./shared/Footer";
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

const ImageContainer = styled.div`
    width: 64px;
    height: 89px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;`;