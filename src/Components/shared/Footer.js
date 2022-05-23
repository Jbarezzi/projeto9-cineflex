import styled from "styled-components";

export default function Footer(props) {
    return(
        <Container>
            { props.children }
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 117px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    column-gap: 20px;
    p {
        font-size: 26px;
        color: #293845;
    }`;