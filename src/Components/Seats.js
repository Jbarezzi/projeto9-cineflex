import axios from "axios";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageContainer from "./shared/ImageContainer";
import Select from "./shared/Select";
import Footer from "./shared/Footer";
import SeatsExample from "./SeatsExample";



export default function Seats() {
    const { sessionId } = useParams();
    const [seats, setSeats] = useState([]);
    const [movieInfo, setMovieInfo] = useState({});
    const seatColor = { availableColor: "#C3CFD9", 
    availableBorderColor: "#7B8B99", 
    notAvailableColor: "#FBE192", 
    notAvailableBorderColor: "#F7C52B", 
    selectedColor: "#8DD7CF", 
    selectedBorderColor: "#1AAE9E" }


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
                {seats.map((seat, index) => <RenderSeat seat={seat} key={index} buttonType={seatColor}/>)}
            </List>
            <Container>
                {["Selecionado", "Disponível", "Indisponível"].map((seatType, index) => <SeatsExample key={index} seatType={seatType} buttonType={seatColor} />)}
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
            <SeatButton buttonType={props.buttonType} isAvailable={props.seat.isAvailable}>
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
    background-color: ${props => props.isAvailable ? props.buttonType.availableColor : props.buttonType.notAvailableColor};
    border: 1px solid ${props => props.isAvailable ? props.buttonType.availableBorderColor : props.buttonType.notAvailableBorderColor };
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