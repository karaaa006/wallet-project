import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getBalance } from "../../../redux/selectors/financeSelectors";
import { mainFontFamily } from "../../../utils/stylesVars";
import { secondFontFamily } from "../../../utils/stylesVars";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;
const BalanceWrapper = styled.div`
  width: 280px;
  height: 80px;
  background: #ffffff;
  border-radius: 30px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    width: 336px;
    height: 80px;
  }

  @media screen and (min-width: 1280px) {
    width: 395px;
    height: 80px;
  } ;
`;

const BalanceName = styled.h5`
  font-family: ${mainFontFamily};
  display: block;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: #a6a6a6;
  margin: 8px 0px 12px 32px;

  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }

  /* @media screen and (min-width: 1280px) {
    margin-left: 40px;
  }; */
`;

const BalanceValue = styled.p`
  display: block;
  margin: 0px;
  font-family: ${secondFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 45px;
  display: flex;
  align-items: center;
  color: #000000;
  margin: 0px 0px 11.2px 32px;

  @media screen and (min-width: 768px) {
    margin-left: 40px;
  }

  /* @media screen and (min-width: 1280px) {
    margin-left: 40px;
  }; */
`;

const Balance = () => {
  const balance = useSelector(getBalance);

  return (
    <Wrap>
      <BalanceWrapper>
        <BalanceName>ваш баланс</BalanceName>
        <BalanceValue>{`₴ ${balance}`}</BalanceValue>
      </BalanceWrapper>
    </Wrap>
  );
};

export default Balance;
