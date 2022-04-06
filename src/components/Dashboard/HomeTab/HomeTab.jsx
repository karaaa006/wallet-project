import styled from "styled-components";

import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { TransactionsTable } from "./TransactionsTable";
import { AddBtn } from "./AddBtn";

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <MainTab>
        <TransactionsTable />
        <AddBtn onClick={handleClick} />
      </MainTab>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        justify="start"
        title="Добавить транзакцию"
      ></Modal>
    </>
  );
};
