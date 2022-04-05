import { Circles } from 'react-loader-spinner'
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
  
   return <LoaderThumb><Circles color="#24CCA7" height={80} width={80}/></LoaderThumb>
};
