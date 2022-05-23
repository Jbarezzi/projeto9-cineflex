import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        font-weight: 400;
        font-family: "Roboto", sans-serif;
        background-color: #FFFFFF;
    }`;

export default GlobalStyles;