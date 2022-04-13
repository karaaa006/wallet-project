import styled from "styled-components";

import emptyWallet from "../../images/empty.png"

const Wrap = styled.div`
text-align: center;
`;

export const EmptyWrap = () => {
    return(
        <Wrap>
          <h2>Нет данных</h2>
          <img src={emptyWallet} alt="Empty wallet" width="400px" />
        </Wrap>
    )
}