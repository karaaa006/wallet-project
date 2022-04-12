import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 15px 20px;

  ${size.M} {
    padding: 32px;
  }
  ${size.L} {
    padding: 32px 16px;
  }
`;

export const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
