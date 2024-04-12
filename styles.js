import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
  margin: 0;
  }

  :root {
    --color-background:#fbe0c3; 
    --color-font:#344648;
    --color-font-light:white;
  }

  body {
    margin: auto;
    margin-top:5rem;
    font-family: system-ui;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    max-width: 375px;
    background-color: var(--color-background);

  }

  img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

  


`;
