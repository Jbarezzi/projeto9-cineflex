import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "./shared/Select";
import Footer from "./shared/Footer";
import ImageContainer from "./shared/ImageContainer";



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

function Session(props) {
    return(
        <Container>
            <p>{props.day.weekday} - {props.day.date}</p>
            <Showtimes>
                {props.day.showtimes.map((showtime, index) => <Link to={`/assentos/${showtime.id}`} key={index}><button>{showtime.name}</button></Link>)}
            </Showtimes>
        </Container>
    );
}

const Container = styled.li`
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
        font-size: 20px;
        color: #293845;

    }`;

const Showtimes = styled.div`
    display: flex;
    column-gap: 8px;
    button {
        background-color: #E8833A;
        width: 83px;
        height: 43px;
        border: none;
        border-radius: 3px;
        color: #FFFFFF;
        font-size: 18px;
    }`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    margin-bottom: 117px;`;