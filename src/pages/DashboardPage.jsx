import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../redux/operations/financeOperations";
import { SideBar } from "../components/Dashboard/SideBar/SideBar";

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

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => dispatch(fetchTransactions());

    getData();
  }, [dispatch]);

  return (
    <PageWrap>
      <SideBar />
      <Outlet />
    </PageWrap>
  );
}
