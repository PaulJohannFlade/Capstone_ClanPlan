import { createGlobalStyle } from "styled-components";
import { Indie_Flower } from "next/font/google";

const indieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indieflower",
});

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
    --font-indieflower:${indieFlower.style.fontFamily};
  }

  body {
    margin: auto;
    margin-top:5rem;
    font-family: Helvetica;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    max-width: 375px;
    background-color: var(--color-background);
    font-family: var(--font-indieflower);
    

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
  font-family: var(--font-indieflower);

}


#root, #__next {
  isolation: isolate;
}

a {
  text-decoration: none;
  color:inherit;
}
a:hover, button:hover {
  cursor: pointer;
  opacity: 0.5;
}
  

/* react-big-calendar styles: */

.rbc-today {
    background-color: var(--color-background);
}

.rbc-event {
  background-color: var(--color-font);
  font-size: 0.5rem;
  font-weight: 700;
  padding: 0.2rem;
}

.rbc-row-segment .rbc-event-content {
  text-overflow: clip;
}

.rbc-time-view {
.rbc-label {
display: none;
}
.rbc-allday-cell {
height: auto;
max-height: unset;
}
.rbc-time-content {
display: none;
}
}

.rbc-button-link span {
  white-space: normal;
  text-overflow: clip;
}

.rbc-addons-dnd-row-body {
  height: 296px;
}


/* MultiSelect styles: */

span.chip {
  background-color: var(--color-font);
}

.multiSelectContainer li.option:hover {
  background-color: var(--color-font);
}

`;
