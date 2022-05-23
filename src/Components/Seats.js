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
                {seats.map((seat, index) => <RenderSeat seat={seat} key={index} />)}
            </List>
            <Container>
                {["Selecionado", "Disponível", "Indisponível"].map((seatType, index) => <SeatsExample key={index} seatType={seatType} />)}
            </Container>
            {/* <Forms>

            </Forms> */}
            <Footer>
                <ImageContainer>
                    { movieInfo.movie === undefined ? "" : <img src={movieInfo.movie.posterURL} alt={`Poster de ${movieInfo.movie.title}`} />}
                </ImageContainer>    
                    { movieInfo.movie === undefined ? "" : <p>{movieInfo.movie.title}<br />{movieInfo.day.weekday} - {movieInfo.day.date}</p>}  
            </Footer>
        </>
    );
}

function RenderSeat(props) {
    return(
        <li>
            <SeatButton isAvailable={props.seat.isAvailable}>
                <p>{props.seat.name}</p>
            </SeatButton>
        </li>
    );
}

function SeatsExample(props) {
    if(props.seatType === "Selecionado") {
        return <SelectedSeat seatType={props.seatType} />
    } else {
        return <NormalSeats seatType={props.seatType} />
    }
}

function SelectedSeat(props) {
    return(
    <ButtonContainer>
        <SelectedSeatButton></SelectedSeatButton>
        <p>{props.seatType}</p>
    </ButtonContainer>);
}

function NormalSeats(props) {
    return(
        <ButtonContainer>
            <SeatButton seatType={props.seatType}></SeatButton>
            <p>{props.seatType}</p>
        </ButtonContainer>
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
    background-color: ${props => props.isAvailable === true ? "#C3CFD9" : "#FBE192"};
    border: 1px solid ${props => props.isAvailable === true ? "#808F9D" : "#F7C52B"};
    border-radius: 12px;
    width: 26px;
    height: 26px;
    color: #000000;
    font-size: 11px;
    `;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 16px;
    `;

const SelectedSeatButton = styled.button`
    background-color: #8DD7CF;
    border: 1px solid #1AAE9E;
    border-radius: 12px;
    width: 24px;
    height: 24px;
    color: #000000;
    font-size: 11px;`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    `;