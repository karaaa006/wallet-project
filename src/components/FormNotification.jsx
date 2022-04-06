import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: -8px;
`;

export const FormNotification = ({ visibility, children }) => {
  return <Wrap visibility={visibility}>{children}</Wrap>;
};
