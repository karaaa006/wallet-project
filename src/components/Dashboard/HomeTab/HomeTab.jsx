import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../Common/Modal";
import { TransactionsTable } from "./TransactionsTable";
import { AddBtn } from "./AddBtn";
import { getFinance } from "../../../redux/selectors/financeSelectors";
import { AddTransaction } from "../AddTransaction/AddTransaction";
import Balance from "../SideBar/Balance";
import Media from "react-media";

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 767px) {
    & div:first-of-type {
      margin-bottom: 32px;
    }
  }
`;

export const HomeTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const transactions = useSelector(getFinance);

  return (
    <>
      <MainTab>
        <Media query="(max-width: 767px)" render={() => <Balance />} />
        <TransactionsTable transactions={transactions} />
        <AddBtn onClick={handleClick} />
      </MainTab>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        justify="start"
        title="Добавить транзакцию"
        mb="15px"
        w="540px"
      >
        <AddTransaction modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </Modal>
    </>
  );
};
