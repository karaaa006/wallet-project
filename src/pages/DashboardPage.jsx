import styled from "styled-components";
import { useSelector } from "react-redux";
import userSelectors from "../redux/userSelectors";
import { useState } from "react";
import { Currency } from "../components/Currency";
import { Header } from "../components/Header";
import { Chart } from "../components/Chart";
import { Loader } from "../components/Loader";
import { accentCl } from "../utils/stylesVars";
import plus from "../images/icons/plus.svg";
import { Modal } from "../components/Modal";

const PageWrap = styled.div`
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0 16px;
  }
`;

//  ______________________Для пропсов диаграммы прокидываем объет такого формата,
//  в котором обязательно должны быть category, categorySum, color, totalSum__________________
const statistics = {
  categories: [
    {
      category: "Продукты",
      categorySum: 2050,
      color: " rgba(254, 208, 87, 1)",
    },
    {
      category: "Ежемесячные расходы",
      categorySum: 500,
      color: "rgba(253, 148, 152, 1)",
    },
    {
      category: "Авто",
      categorySum: 7800,
      color: "rgba(36, 204, 167, 1)",
    },
  ],
  totalSum: 10350,
};

const PlusIcon = styled.img`
`;

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
    background-color: #14BE99;
  }
`;

export default function DashboardPage() {
  const isLoading = useSelector(userSelectors.getIsLoading);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <PageWrap>
          <Currency />
          <Chart statistics={statistics} />
          <AddButton  onClick={handleClick}>
            <PlusIcon src={plus} />
          </AddButton>
            <Modal
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            justify="start"
            title="Добавить транзакцию"
          ></Modal>
        </PageWrap>
      )}
    </>
  );
}
