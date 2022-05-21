import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCss from "./css/ResetCss";
import GlobalStyles from "./css/GlobalStyles";
import Header from "./Components/Header";
import MainPage from "./Components/MainPage";
import Sessions from "./Components/Sessions";
import Seats from "./Components/Seats";

export default function App() {
    return(
        <BrowserRouter>
            <ResetCss />
            <GlobalStyles />
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sessoes/:movieId" element={<Sessions />} />
                <Route path="/assentos/:sessionId" element={<Seats />} />
            </Routes>
        </BrowserRouter>
    );
}