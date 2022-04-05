import styled from "styled-components";
import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import { Chart } from "../components/Chart";

const PageWrap = styled.div`
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 16px;
  }
`;

//  ______________________Для пропсов диаграммы прокидываем объет такого формата_____________________
const statistics = {
  categories: [
    {
      category: "Продукты",
      categorySum: 2050,
      color: " rgba(254, 208, 87, 1)",
    },
    {
      category: "Ежемесячные расходы",
      categorySum: 500,
      color: "rgba(253, 148, 152, 1)",
    },
    {
      category: "Авто",
      categorySum: 7800,
      color: "rgba(36, 204, 167, 1)",
    },
  ],
  totalSum: 10350,
};
export default function DashboardPage() {
  return (
    <>
      <Header />
      <PageWrap>
        <Currency />
        <Chart statistics={statistics} />
      </PageWrap>
    </>
  );
}
