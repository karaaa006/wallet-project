import styled from "styled-components";
import { Currency } from "./Currency";
import Balance from "./Balance";
import { Navigation } from "./Navigation";

const SideBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
`;

export const SideBar = () => {
  return (
    <SideBarWrap>
      <Navigation />

      <Balance />

      <Currency />
    </SideBarWrap>
  );
};
