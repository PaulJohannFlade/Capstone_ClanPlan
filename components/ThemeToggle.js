import styled from "styled-components";

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: var(--color-font);
  /* background-color: ${({ $dark }) => ($dark ? "#333" : "#ccc")}; */
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;

  &:before {
    content: "";
    font-size: 16px;
    position: absolute;
    top: 4px;
    left: ${({ $dark }) => ($dark ? "20px" : "calc(100% - 20px)")};
    transform: translateX(${({ $dark }) => ($dark ? "0" : "-100%")});
    transition: transform 0.3s;
  }
`;

const ToggleCheckbox = styled.input`
  display: none;
`;

export default function ThemeToggle({ isDarkTheme, onToggleTheme }) {
  return (
    <ToggleSwitch>
      <ToggleCheckbox
        type="checkbox"
        id="theme-toggle"
        onChange={onToggleTheme}
        checked={isDarkTheme}
      />
      <ToggleLabel htmlFor="theme-toggle" $dark={isDarkTheme}>
        {isDarkTheme ? "☀︎" : "☾"}
      </ToggleLabel>
    </ToggleSwitch>
  );
}
