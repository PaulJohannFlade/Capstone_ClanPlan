import { createGlobalStyle } from "styled-components";
import { Handlee } from "next/font/google";

const handlee = Handlee({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handlee",
});

export const lightTheme = {
  background: "#FFFFFF",
  text: "#344648",
  button: "#e6e4e4",
  buttonActive: "#bbf1f9ff",
  colorScheme: "light",
  errorBorder: "#80808080",
};

export const darkTheme = {
  background: "#344648",
  text: "#FFFFFF",
  button: "#626768",
  buttonActive: "#065465",
  colorScheme: "dark",
  errorBorder: "#808080e9",
};

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
    --color-background:${(props) => props.theme.background}; 
    --color-font:${(props) => props.theme.text};
    --color-icon:#cccaca;
    --color-footer-signature:#a7a3a3;
    --color-alert:#d32f2f;
    --color-button-active:${(props) => props.theme.buttonActive};
    --color-button:${(props) => props.theme.button};
    --font-handlee:${handlee.style.fontFamily};
    --color-scheme-date:${(props) => props.theme.colorScheme};
    --color-progress-missed:#f95454ff;
    --color-progress-active:${(props) => props.theme.buttonActive};
    --color-progress-done:#d3d3d3ff;
    --color-error-border:${(props) => props.theme.errorBorder};
  }

  html {
    @media (min-width: 600px){
    font-size: 17px;
    }
    @media (min-width: 900px){
    font-size: 18px;
    }
    @media  (min-width: 1200px){
      font-size: 19px;
    }
    @media (min-width:1536px){
      font-size: 20px;
    }
  }

  body {
    min-width: 330px;
    margin: auto;
    margin-top:5.5rem;
    margin-bottom:6rem;
    color: var(--color-font);
    font-family: Helvetica;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    max-width: 100vw;
    background-color: var(--color-background);
    transition: background-color 0.5s ease, color 0.5s ease;
    
    @media (min-width: 900px) {
    width: calc(100vw - 100px);
    margin-left: calc(100px + 0.5rem);
    margin-bottom:auto;
    }
  }

  img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
 
}

input, button, textarea, select {
  font: inherit;
  color: inherit;
  background-color: var(--color-background);
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

h1{
  font-size: 2rem;
}

h2 {
  font-family: var(--font-handlee);
  font-size: 1.5rem;
}

p{
  font-size: 1rem;
}

#root, #__next {
  isolation: isolate;
}

a {
  text-decoration: none;
  color:inherit;
}
a:hover {
  cursor: pointer;
  opacity: 0.5;
  transition: all 500ms linear;
}

button:hover {
  cursor: pointer;
  opacity: 0.5;
  transition: all 500ms linear;
}

/* react-big-calendar styles: */

.rbc-today {
    background-color: var(--color-button-active);
}

.rbc-button-link {
  font-size: 0.9rem;
}

.rbc-event {
  background-color: var(--color-font);
  font-size: 0.45rem;
  font-weight: 700;
  padding: 0.05rem 0.2rem;

  @media (min-width: 900px) {
    font-size: 0.7rem;
  }

}

.rbc-show-more {
  font-size: 0.45rem;
}


.rbc-row-segment .rbc-event-content {
  text-overflow: clip;
}

.rbc-time-view {
.rbc-label {
display: none;
}
.rbc-allday-cell {
height: 100%;
max-height: unset;
}
.rbc-time-content {
display: none;
}
}

.rbc-time-header {
  min-height: 310px;
  height: 44vh;
  @media (min-width: 900px) {
    min-height: 637px;
    height: 72vh;
  }
}

.rbc-button-link span {
  white-space: normal;
  text-overflow: clip;
}

.rbc-addons-dnd-row-body {
  min-height: 290px;
  height: 45vh;
  @media (min-width: 900px) {
    min-height: 637px;
    height: 72vh;
  }
}

.rbc-btn-group button {
  color: var(--color-font);
}

.rbc-btn-group .rbc-active {
  color: #344648;
}


/* MultiSelect styles: */

span.chip {
  background-color: var(--color-button-active);
  color: var(--color-font);
}

.multiselectContainer {
	background-color: var(--color-background);
  }

.multiSelectContainer li.option:hover {
  background-color: var(--color-button-active);
  color: var(--color-font);
}

.optionContainer {
	background-color: var(--color-background);
  }

/* Tostify styles */

.Toastify__progress-bar--success {
  background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(224,253,29,1) 50%, rgba(252,176,69,1) 100%);
}

.Toastify__toast{
box-shadow: 5px 5px 15px 5px #000000;
}
 
.Toastify__toast-container--top-center {
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}


`;
