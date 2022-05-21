import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetCSS from "./CSS/ResetCSS";
import GlobalStyles from "./CSS/GlobalStyles";
import Header from "./Components/Header";
import MainPage from "./Components/MainPage";
import Sessions from "./Components/Sessions";

export default function App() {
    return(
        <BrowserRouter>
            <ResetCSS />
            <GlobalStyles />
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/sessoes/:movieId" element={<Sessions />} />
                {/* <Route path="/assentos/:sessionID" element={} /> */}
            </Routes>
        </BrowserRouter>
    );
}