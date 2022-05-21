import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Session(props) {
    return(
        <Container>
            <p>{props.day.weekday} - {props.day.date}</p>
            <Showtimes>
                {props.day.showtimes.map((showtime, index) => <Link to={`/assentos/${showtime.id}`}><button key={index}>{showtime.name}</button></Link>)}
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
