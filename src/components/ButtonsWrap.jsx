import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonsWrap = ({children}) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    )
}