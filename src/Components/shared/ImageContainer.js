import styled from "styled-components";

export default function ImageContainer(props) {
    return(
        <Container>
            { props.children }
        </Container>
    );
}

const Container = styled.div`
    width: 64px;
    height: 89px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;`;