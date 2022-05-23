import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        background-color: #FFFFFF;
    }
    
    p {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
    }
    `;

export default GlobalStyles;