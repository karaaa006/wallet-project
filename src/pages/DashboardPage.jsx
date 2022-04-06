import styled from "styled-components";
// import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import Navigation from "../components/Navigation";

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
  return (
    <>
      <Header />
      <PageWrap>
        <Navigation />
        {/* <Currency /> */}
      </PageWrap>
    </>
  );
}
