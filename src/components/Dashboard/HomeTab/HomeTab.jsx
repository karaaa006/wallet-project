import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { TransactionsTable } from "./TransactionsTable";
import { AddBtn } from "./AddBtn";
import { DropDown } from "../../DropDown";
import { getFinance } from "../../../redux/selectors/financeSelectors";
import {AddTransaction} from "../AddTransaction/AddTransaction"

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  }; 
  
  const [selectedOption, setSelectedOption] = useState({});
  const transactions = useSelector(getFinance);

  return (
    <>
      <MainTab>
        <TransactionsTable transactions={transactions} />
        <AddBtn onClick={handleClick} />
      </MainTab>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        justify="start"
        title="Добавить транзакцию"
      >
        <AddTransaction modalIsOpen={modalIsOpen} closeModal={closeModal}/>
      </Modal>
    </>
  );
};
