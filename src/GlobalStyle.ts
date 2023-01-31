import { createGlobalStyle } from "styled-components";
import { Theme } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html {
    box-sizing: border-box;
  }
  *, ::after, ::before {
    box-sizing: inherit;
  }
  body {
    font-family: "Lato", sans-serif;
    color: ${({ theme }) => theme.colors.text};
    background-image: linear-gradient(to right top, #145da0, #367bb1, #5c99c1, #85b7d0, #b1d4e0);
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
`;

export default GlobalStyle;
