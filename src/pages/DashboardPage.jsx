import styled from "styled-components";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../redux/operations/financeOperations";
import { SideBar } from "../components/Dashboard/SideBar/SideBar";
import { Header } from "../components/Header";
import { HomeTab } from "../components/Dashboard/HomeTab/HomeTab";
import { Currency } from "../components/Dashboard/SideBar/Currency";
import { DiagramTab } from "../components/Dashboard/DiagramTab/DiagramTab";

import useMediaQuery from "../Hooks/useMediaQuery";

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 0 20px;

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(50px);

  @media screen and (min-width: 768px) {
    padding: 0 32px;
    flex-direction: row;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 16px;
    flex-direction: row;
  }
`;

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width: 480px)");

  useEffect(() => {
    const getData = () => dispatch(fetchTransactions());

    getData();

    if (matches && pathname === "/dashboard/currency") {
      navigate("home");
    }
  }, [dispatch, pathname, matches, navigate]);

  return (
    <>
      <Header />
      <PageWrap>
        <SideBar balance={"0"} />
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
