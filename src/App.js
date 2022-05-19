import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Components/GlobalStyle";
import Header from "./Components/Header";

export default function App() {
    return(
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                {/* <Route path="/" element={} />
                <Route path="/sessoes" element={} />
                <Route path="/assentos" element={} /> */}
            </Routes>
        </BrowserRouter>
    );
}