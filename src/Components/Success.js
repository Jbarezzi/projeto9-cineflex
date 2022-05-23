import styled from "styled-components";
import Select from "./shared/Select";

export default function Success(props) {
    console.log(props)
    return(
        <>
            <Select success={true}>
                <p>Pedido feito<br />com sucesso!</p>
            </Select>
            <Container>
                <strong>Filme e Sessão</strong>
                {props.movieInfo.movie === undefined ? "" : <p>{props.movieInfo.movie.title}</p>}
                {props.movieInfo.day === undefined ? "" : <p>{props.movieInfo.day.date}  {props.movieInfo.name}</p>}
            </Container>
            <Container>
                <strong>Comprador</strong>
                <p>Nome: {props.name}</p>
                <p>CPF: {props.cpf}</p>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-bottom: 30px;
    margin-left: 30px;
    p {
        font-size: 22px;
        color: #293845;
    }

    strong {
        font-weight: 700;
        font-size: 24px;
        color: #293845;
    }
    `;