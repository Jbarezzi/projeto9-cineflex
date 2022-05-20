import styled from "styled-components";

export default function Session(props) {
    return(
        <List>
            <Container>
                <p>{props.day.weekday} - {props.day.date}</p>
                <Showtimes>
                    {props.day.showtimes.map((showtime) => <button>{showtime.name}</button>)}
                </Showtimes>
            </Container>
        </List>
    );
}

const List = styled.ul`
    `;

const Container = styled.div`
    `;

const Showtimes = styled.div`
    `;
