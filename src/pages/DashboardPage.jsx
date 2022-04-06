import styled from "styled-components";
import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
const PageWrap = styled.div`
  padding: 0 20px;
display: flax;
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
        <Currency />
        <Table/>
      </PageWrap>
    </>
  );
}
