import styled from "styled-components";

export default function Select(props) {
    return(
        <Container success={props.success}>
            { props.children }
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 24px;
        color: ${props => props.success ? "#247A6B" : "#293845"} ;
        font-weight: ${props => props.success ? "700" : "400"};
    }`;
