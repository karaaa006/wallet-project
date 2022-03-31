import styled from "styled-components";
import { accentCl, secondCl } from "../utils/stylesVars";

const StyledButton = styled.button`
  margin: ${({ m }) => (m ? m : "0")};
  padding: ${({ p }) => (p ? p : "10px 20px")};
  width: ${({ w }) => (w ? w : "auto")};
  height: ${({ h }) => (h ? h : "auto")};
  background-color: ${({ accent }) => (accent ? accentCl : "#ffffff")};
  border: 1px solid ${({ accent }) => (accent ? accentCl : secondCl)};
  color: ${({ accent }) => (accent ? "#ffffff" : secondCl)};
  border-radius: 20px;
  font-size: ${({ fz }) => (fz ? fz : "18px")};
  text-transform: uppercase;

  cursor: pointer;

  :hover,
  :focus {
    background-color: ${({ accent }) => (accent ? "#14BE99" : "")};
    border-color: ${({ accent }) => (accent ? "#14BE99" : "#121ea1")};
    color: ${({ accent }) => (accent ? "" : "#121ea1")};
  }

  transition: border ease 250ms, background-color ease 250ms, color ease 250ms;
`;

export const Button = ({ m, p, w, h, fz, accent, children }) => {
  return (
    <StyledButton m={m} p={p} w={w} h={h} fz={fz} accent={accent}>
      {children}
    </StyledButton>
  );
};
