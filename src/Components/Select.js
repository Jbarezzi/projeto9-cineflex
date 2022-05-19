import styled from "styled-components";

export default function Select(props) {
    return(
        <Container>
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
        color: #293845;
    }`;
