import styled from "styled-components";
import { useSelector } from "react-redux";
import userSelectors from '../redux/userSelectors';
import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";



const PageWrap = styled.div`
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 16px;
  }
`;

export default function DashboardPage() {
  const isLoading = useSelector(userSelectors.getIsLoading);

  return (
     <>
      <Header />

      {isLoading ? (<Loader />) : (
        <PageWrap>
        <Currency />
        </PageWrap>
      )}
    </>
  );
}
