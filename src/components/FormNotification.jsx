import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: -8px;
  visibility: ${({ visibility }) => (visibility ? "visible" : "hidden")};
`;

export const FormNotification = ({ visibility, children }) => {
  return <Wrap visibility={visibility}>{children}</Wrap>;
};
