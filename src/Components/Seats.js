import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageContainer from "./shared/ImageContainer";
import Select from "./shared/Select";
import Footer from "./shared/Footer";



export default function Seats() {
    const { sessionId } = useParams();
    const [seats, setSeats] = useState([]);
    const [movieInfo, setMovieInfo] = useState({});
    const availableSeat = { color: "#C3CFD9", borderColor: "#7B8B99"};
    const notAvailableSeat = { color: "#FBE192", borderColor: "#F7C52B"};
    const selectedSeat = { color: "#8DD7CF", borderColor: "#1AAE9E"};


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        promise.then(response => {
            setSeats(response.data.seats);
            setMovieInfo(response.data);
        })
    }, [sessionId]);

    return(
        <>
            <Select>
                <p>Selecione o(s) assentos</p>
            </Select>
            <List>
                {seats.map((seat, index) => <RenderSeat seat={seat} key={index} buttonType={availableSeat}/>)}
            </List>
            <SeatsExample>
                <Container>
                    <SeatButton buttonType={selectedSeat} size={"24px"}></SeatButton>
                    <p>Selecionado</p>
                </Container>
                <Container>
                    <SeatButton buttonType={availableSeat} size={"24px"}></SeatButton>
                    <p>Disponível</p>
                </Container>
                <Container>
                    <SeatButton buttonType={notAvailableSeat} size={"24px"}></SeatButton>
                    <p>Indisponível</p>
                </Container>
            </SeatsExample>
            <Footer>
                <ImageContainer>
                    <img src={movieInfo.movie.posterURL} alt={`Poster de ${movieInfo.movie.title}`} />
                </ImageContainer>    
                <p>{movieInfo.movie.title}<br />{movieInfo.day.weekday} - {movieInfo.day.date}</p>
            </Footer>
        </>
    );
}

function RenderSeat(props) {
    return(
        <li>
            <SeatButton buttonType={props.buttonType} size={"26px"}>
                {props.seat.name}
            </SeatButton>
        </li>
    );
}

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-left: 24px;
    column-gap: 7px;
    row-gap: 18px;
    `;

const SeatButton = styled.button`
    background-color: ${props => props.buttonType.color};
    border: 1px solid ${props => props.buttonType.borderColor};
    border-radius: 12px;
    width: ${props => props.size};
    height: ${props => props.size};
    color: #000000;
    font-size: 11px;
    `;

const SeatsExample = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 16px;
    `;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    `;