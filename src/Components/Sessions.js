import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Select from "./utils/Select";
import Session from "./Session";

export default function Sessions() {
    const { movieId } = useParams();
    const [sessionDays, setSessionDays] = useState([]);
    const [movieSessions, setMovieSessions] = useState({});

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then(response => {
            setSessionDays(response.data.days);
            setMovieSessions(response.data);
        });
    }, []);
    
    return(
        <>
            <Select>
                <p>Selecione o horário</p>
            </Select>
            {sessionDays.map((day, index) => <Session day={day} key={index} />)}
        </>
    );
}