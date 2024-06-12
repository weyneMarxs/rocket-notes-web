import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme}) => theme.COLORS.WHITE};
    -webkit-font-smoothing: antialiased;
    /* overflow: hidden; */
  }

  body, input, button, textarea {
    font-family: 'Roboto Slab', sans-serif;
    font-size: 16px;
    outline: none;
  }
  a {
    text-decoration: none;
  }

  button, a {
    cursor: pointer;
    transition: filter .2s;
  }
  button:hover, a:hover {
    filter: brightness(.9);
  }

  ::-webkit-scrollbar {
  width: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`