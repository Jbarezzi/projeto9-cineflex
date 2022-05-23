import axios from "axios";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ImageContainer from "./shared/ImageContainer";
import Select from "./shared/Select";
import Footer from "./shared/Footer";

export default function Seats() {
    const { sessionId } = useParams();
    const [seats, setSeats] = useState([]);
    const [movieInfo, setMovieInfo] = useState({});
    const [seatsId, setSeatsId] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        promise.then(response => {
            setSeats(response.data.seats);
            setMovieInfo(response.data);
        })
    }, [sessionId]);

    function selectSeat(idSeat, isAvailable, setClicked, clicked) {
        seats.map((value, index) => {
            if(idSeat === index && isAvailable === false) {
                alert("Esse assento já está ocupado.");
                console.log(seatsId)
            } else if (idSeat === index && isAvailable === true) {
                setClicked(!clicked);
                setSeatsId([...seatsId, value.id]);
            } else if (idSeat === index && clicked === true){
                setClicked(!clicked);
                setSeatsId(seatsId.filter((id) => id !== value.id));
            }
        });
    }

    return(
        <>
            <Select>
                <p>Selecione o(s) assentos</p>
            </Select>
            <List>
                {seats.map((seat, index) => <RenderSeat seat={seat} key={index} selectSeat={selectSeat} idSeat={index} />)}
            </List>
            <Container>
                {["Selecionado", "Disponível", "Indisponível"].map((seatType, index) => <SeatsExample key={index} seatType={seatType} />)}
            </Container>
            <Forms seatsId={seatsId} />
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
    const [clicked, setClicked] = useState(false);

    return(
        <SeatButton isAvailable={props.seat.isAvailable} chosen={clicked} onClick={() => props.selectSeat(props.idSeat ,props.seat.isAvailable, setClicked, clicked)} >
            <p>{props.seat.name}</p>
        </SeatButton>
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

function Forms(props) {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    function submitTickets() {
        const APIobject = {
            ids: props.seatsId,
            name: name,
            cpf: cpf
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", APIobject);
        promise.then(navigate("/sucesso", { replace: true }));
    }

    return(
        <form onSubmit={submitTickets}>
            <FormsContainer>
                <label htmlFor="name">Nome do Comprador:</label>
                <input type="text" name="name" valeu={name} required placeholder="Digite seu nome..." onChange={(e) => setName(e.target.value)} />
            </FormsContainer>
            <FormsContainer>
                <label htmlFor="name">CPF do Comprador:</label>
                <input type="text" name="cpf" valeu={cpf} required placeholder="Digite seu CPF..." onChange={(e) => setCpf(e.target.value)} />
            </FormsContainer>
            <Button>
                <button onClick={props.test} type="submit">Reservar assento(s)</button>
            </Button> 
        </form>
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
    background-color: ${props => props.chosen ? '#8DD7CF' : props.isAvailable ? '#C3CFD9' :'#FBE192'};
    border: 1px solid ${props => props.chosen ? '#45BDB0' : props.isAvailable ? '#808F9D' :'#F7C52B'};
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