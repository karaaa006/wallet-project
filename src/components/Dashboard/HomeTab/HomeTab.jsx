import styled from "styled-components";

import { useState } from "react";
import { accentCl } from "../../../utils/stylesVars";
import plus from "../../../images/icons/plus.svg";
import { Modal } from "../../../components/Modal";
import { Table } from "./Table";

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlusIcon = styled.img``;

const AddButton = styled.button`
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${accentCl};
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;

  :hover,
  :focus {
    background-color: #14be99;
  }
`;

export const HomeTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <MainTab>
      <AddButton onClick={handleClick}>
        <PlusIcon src={plus} />
      </AddButton>
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        justify="start"
        title="Добавить транзакцию"
      ></Modal>
      <Table />
    </MainTab>
  );
};
