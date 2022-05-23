import styled from "styled-components";

export default function SeatsExample(props) {
    return(
        <Container>
            <SeatButton buttonType={props.buttonType} isAvailable={props.seatType}></SeatButton>
            <p>{props.seatType}</p>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 12px;
    `;

const SeatButton = styled.button`
    background-color: ${props => props.isAvailable === "Disponível" ? props.buttonType.availableColor : props.buttonType.notAvailableColor};
    border: 1px solid ${props => props.isAvailable === "Disponível" ? props.buttonType.availableBorderColor : props.buttonType.notAvailableBorderColor };
    border-radius: 12px;
    width: 24px;
    height: 24px;
    color: #000000;
    font-size: 11px;
    `;