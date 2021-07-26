import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  *,
  *:after,
  *:before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
    outline: none;
  }

  html {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
    }
  }

  body {
    font-family: "Lato", sans-serif;
    overflow-y: scroll;
    background: ${props => props.theme.colors.background};
  }

  h2 {
    font-size: 2rem;
    font-family: "Raleway", cursive;
    font-weight: lighter;
    color: #333;
  }

  h3 {
    font-size: 1.5rem;
    color: #333;
    padding: 1.5rem 0;
  }

  p {
    font-size: 1.5rem;
    line-height: 150%;
    color: #696969;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  img {
    display: block;
  }

  input {
    font-family: "Lato", sans-serif;
    font-weight: bold;
  }
`

export default GlobalStyles