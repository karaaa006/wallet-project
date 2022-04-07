import styled from "styled-components";
import { Currency } from "./Currency";
import Balance from "./Balance";
import { Navigation } from "./Navigation";
import Media from "react-media";

const SideBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
`;

export const SideBar = () => {
  return (
    <Media query="(max-width: 767px)">
      {(matches) =>
        matches ? (
          <SideBarWrap>
            <Navigation />
            <Balance />
          </SideBarWrap>
        ) : (
          <SideBarWrap>
            <Navigation />

            <Balance />

            <Currency />
          </SideBarWrap>
        )
      }
    </Media>
  );
};
