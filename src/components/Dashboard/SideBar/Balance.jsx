import styled from "styled-components";

const BalanceWrap = styled.div`
  width: 100px;
  height: 75px;
  background-color: white;
  margin-bottom: 20px;
`;

const Amoung = styled.p`
  font-size: 20px;
`;
export const Balance = () => {
  return (
    <BalanceWrap>
      <Amoung>200$</Amoung>
    </BalanceWrap>
  );
};
