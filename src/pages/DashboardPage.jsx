import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../redux/operations/financeOperations";
import { getFinance } from "../redux/selectors/financeSelectors";
import { Currency } from "../components/Currency";
import { Chart } from "../components/Chart";
import { DiagramTab } from "../components/DiagramTab";

const PageWrap = styled.div`
  display: flex;

  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 16px;
  }
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
`;

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
`;

const RouteButtons = styled.div`
  width: 100px;
  height: 75px;
`;
const Balance = styled.div`
  width: 100px;
  height: 75px;
  background-color: white;
  margin-bottom: 20px;
`;

const Amoung = styled.p`
  font-size: 20px;
`;

const RoutButton = styled.button`
  font-size: 15px;
  margin-bottom: 15px;
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
  const dispatch = useDispatch();
  const data = useSelector(getFinance);

  useEffect(() => {
    const getData = () => dispatch(fetchTransactions());

    getData();
  }, [dispatch]);

  const showData = () => {
    console.log(data);
  };
  return (
    <>
      <PageWrap>
        <SideBar>
          <RouteButtons>
            <RoutButton onClick={showData}>home</RoutButton>
            <RoutButton>diagrama</RoutButton>
          </RouteButtons>

          <Balance>
            <Amoung>200$</Amoung>
          </Balance>
          <Currency />
        </SideBar>
        <MainTab>
          <Chart statistics={statistics} />
          <DiagramTab />
        </MainTab>
      </PageWrap>
    </>
  );
}
