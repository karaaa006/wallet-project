import styled from "styled-components";
import { Currency } from "../components/Currency";

const PageWrap = styled.div`
  @media screen and (min-width: 768px) {
    padding: 60px 20px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function DashboardPage() {
  return (
    <PageWrap>
      <Currency />
    </PageWrap>
  );
}
