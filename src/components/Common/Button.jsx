import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { accentCl, secondCl } from "../../utils/stylesVars";

const StyledButton = styled.button`
  margin: ${({ m }) => (m ? m : "0")};
  padding: ${({ p }) => (p ? p : "10px 20px")};
  width: ${({ w }) => (w ? w : "auto")};
  max-width: ${({ mw }) => (mw ? mw : "auto")};
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

  :disabled {
    background-color: #e5f1ef;
    border-color: #e5f1ef;

    cursor: default;
  }

  transition: border ease 250ms, background-color ease 250ms, color ease 250ms;
`;

const SpinerWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Button = ({
  m,
  p,
  w,
  mw,
  h,
  fz,
  accent,
  disabled,
  children,
  onClick,
  type = "button",
  isLoading,
}) => {
  return (
    <StyledButton
      m={m}
      p={p}
      w={w}
      h={h}
      fz={fz}
      mw={mw}
      accent={accent}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <SpinerWrap>
          <TailSpin
            color="rgba(0,0,0,0.3)"
            ariaLabel="loading-indicator"
            width="35px"
          />
        </SpinerWrap>
      ) : (
        children
      )}
    </StyledButton>
  );
};
