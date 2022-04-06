import styled from "styled-components";
import { useSelector } from "react-redux";
import userSelectors from "../redux/userSelectors";
import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import { Chart } from "../components/Chart";
import { Loader } from "../components/Loader";
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

//  ______________________Для пропсов диаграммы прокидываем объет такого формата,
//  в котором обязательно должны быть category, categorySum, color, totalSum__________________
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
  const isLoading = useSelector(userSelectors.getIsLoading);

  return (
    <>
      <Header />
<Table/>
      {isLoading ? (
        <Loader />
      ) : (
        <PageWrap>
          <Currency />
          <Chart statistics={statistics} />
        </PageWrap>
      )}
    </>
  );
}
