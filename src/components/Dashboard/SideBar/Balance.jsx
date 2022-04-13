import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getBalance } from "../../../redux/selectors/financeSelectors";
import { mainFontFamily, size } from "../../../utils/stylesVars";
import { secondFontFamily } from "../../../utils/stylesVars";

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  width: 280px;
  height: 80px;
  background: #ffffff;
  border-radius: 30px;
  padding-top: 8px;
  padding-bottom: 12px;
  padding-left: 32px;
  ${size.M} {
    pading-left: 40px;
  }
  ${size.M} {
    width: 336px;
    margin-bottom: 32px;
  }
  ${size.L} {
    width: 395px;
  } ;
`;
const BalanceName = styled.p`
  display: flex;
  margin: 0 0 12px;
  font-family: ${mainFontFamily};
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: #a6a6a6;
`;
const BalanceValue = styled.p`
  display: flex;
  margin: 0;
  font-family: ${secondFontFamily};
  font-size: 30px;
  font-weight: 700;
`;

const SpanContainer = styled.span`
  font-weight: 400;
  margin-right: 10px;
`;

const Balance = () => {
  const balance = useSelector(getBalance);

  const parts = balance.toString().split(".");
  if (parts.length < 2) {
    parts[1] = "00";
  } else if (parts[1].length < 2) {
    parts[1] = parts[1] + "0";
  }
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const modifyBalance = parts.join(".");

  return (
    <BalanceWrapper>
      <BalanceName>ваш баланс</BalanceName>
      <BalanceValue>
        <SpanContainer>₴</SpanContainer>
        {modifyBalance}
        {/* {balance.toLocaleString()} */}
      </BalanceValue>
    </BalanceWrapper>
  );
};

export default Balance;
