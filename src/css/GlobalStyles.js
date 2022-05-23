import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        background-color: #FFFFFF;
    }
    
    p {
        font-family: "Roboto", sans-serif;
        font-weight: 400;
    }

    form {
        margin-top: 45px;
    }
    `;

export default GlobalStyles;