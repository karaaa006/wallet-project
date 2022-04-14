import { Circles, TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const LoaderThumb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  @media screen and (max-width: 560px) {
    left: 45%;
    width: 65px;
    height: 65px;
  }
`;

export const Loader = () => {
  return (
    <LoaderThumb>
      <Circles color="rgba(0,0,0,0.3)" height={80} width={80} />
    </LoaderThumb>
  );
};
