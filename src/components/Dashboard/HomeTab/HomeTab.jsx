import styled from "styled-components";

import { useState } from "react";
import { Modal } from "../../../components/Modal";
import { TransactionsTable } from "./TransactionsTable";
import { AddBtn } from "./AddBtn";
import { DropDown } from "../../DropDown";

const MainTab = styled.div`
  display: flex;
  flex-direction: column;
`;

const options = [
  { name: "Еда", id: "dfewfkekf02kf3j03f" },
  { name: "Авто", id: "ffef3f34f43f032f230" },
  { name: "Развлечения", id: "ffef3f34f43fsd032f230" },
  { name: "Семья", id: "ffef3f34f43r3f032f230" },
  { name: "Хобби", id: "ffef3f34f43asrf032f230" },
];
export const HomeTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };
  const [selectedOption, setSelectedOption] = useState({});

  return (
    <>
      <MainTab>
        <DropDown
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          placeholder="Выберите категорию"
        />
        <TransactionsTable />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat iure
          quis, molestias assumenda commodi facere? Qui, sed? Quibusdam adipisci
          eos assumenda voluptas, hic illo. Laborum labore voluptates neque quae
          a.
        </p>
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
