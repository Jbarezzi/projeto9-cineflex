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
            <Forms />
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
    } else if (props.seatType === "Disponível"){
        return <NormalSeats seatType={props.seatType} isAvailable={true} />
    } else {
        return <NormalSeats seatType={props.seatType} isAvailable={false} />
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
            <SeatButton isAvailable={props.isAvailable}></SeatButton>
            <p>{props.seatType}</p>
        </ButtonContainer>
    );
}

function Forms() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");

    return(
        <form onSubmit={submitTickets}>
            <FormsContainer>
                <label htmlFor="name">Nome do Comprador:</label>
                <input type="text" id="name" valeu={name} required placeholder="Digite seu nome..." onChange={(e) => setName(e.target.value)} />
            </FormsContainer>
            <FormsContainer>
                <label htmlFor="name">CPF do Comprador:</label>
                <input type="text" id="cpf" valeu={cpf} required placeholder="Digite seu CPF..." onChange={(e) => setCpf(e.target.value)} />
            </FormsContainer>
            <Button>
                <button type="submit">Reservar assento(s)</button>
            </Button> 
        </form>
    );
}

function submitTickets(event) {
    event.preventDefault();

    axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", event)
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

const FormsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    margin-left: 24px;
    margin-bottom: 10px;

    label {
        color: #293845;
        font-size: 18px;
    }

    input {
        width: 327px;
        height: 51px;
        border-radius: 3px;
        background-color: #FFFFFF;
        border: 1px solid #D4D4D4;
        font-size: 18px;
        color: #AFAFAF;
        font-style: italic;
        padding-left: 16px;
    }
    `;

const Button = styled.div`
    margin-top: 57px;
    margin-bottom: 147px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        width: 225px;
        height: 42px;
        background-color: #E8833A;
        border-radius: 3px;
        border: none;
        font-family: "Roboto", sans-serif;
        font-size: 18px;
        color: #FFFFFF;
    }
    `;