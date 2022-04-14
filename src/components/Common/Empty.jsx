import styled from "styled-components";

import emptyWallet from "../../images/empty.png";

const Wrap = styled.div`
  text-align: center;
`;

const NoDataImg = styled.img`
  width: 100%;
  max-width: 400px;
`;

export const Empty = () => {
  return (
    <Wrap>
      <h2>Нет данных</h2>
      <NoDataImg src={emptyWallet} alt="Нет данных" />
    </Wrap>
  );
};
