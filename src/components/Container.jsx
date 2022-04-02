import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 15px 20px;

  @media screen and (min-width: 768px) {
    padding: 32px;
  }
  @media screen and (min-width: 1280px) {
    padding: 32px 16px;
  }
`;

export const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
