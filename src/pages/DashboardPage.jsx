import styled from "styled-components";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../redux/operations/financeOperations";
import { Header } from "../components/Common/Header";
import { HomeTab } from "../components/Dashboard/HomeTab/HomeTab";
import { Currency } from "../components/Dashboard/SideBar/Currency";
import { DiagramTab } from "../components/Dashboard/DiagramTab/DiagramTab";
import Balance from "../components/Dashboard/SideBar/Balance";
import Navigation from "../components/Dashboard/SideBar/Navigation";
import useMediaQuery from "../Hooks/useMediaQuery";
import Media from "react-media";

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(50px);

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1024px) {
    padding-top: 46px;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: row;
  }
`;

const SideBar = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;
  @media screen and (min-width: 768px) {
    padding: 0 32px;
    flex-direction: row;
    justify-content: space-between;
  }
  @media screen and (min-width: 1024px) {
    padding: 0 32px;
    flex-direction: column;
  }
`;

const MiddleSideBarWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column; ;
`;

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isWideScreen = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const getData = () => dispatch(fetchTransactions());

    getData();

    if (isWideScreen && pathname === "/dashboard/currency") {
      navigate("home");
    }
  }, [dispatch, pathname, isWideScreen, navigate]);

  return (
    <>
      <Header />
      <PageWrap>
        <SideBar>
          <MiddleSideBarWrap>
            <Navigation />
            <Balance />
          </MiddleSideBarWrap>
          <Media query="(min-width: 768px)" render={() => <Currency />} />
        </SideBar>

        <Routes>
          <Route index element={<HomeTab />} />
          <Route path="home" element={<HomeTab />} />
          <Route path="diagram" element={<DiagramTab />} />
          <Route path="currency" element={<Currency />} />
        </Routes>
      </PageWrap>
    </>
  );
}
