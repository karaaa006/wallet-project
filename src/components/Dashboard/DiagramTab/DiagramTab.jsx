import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchStatistics } from "../../../redux/operations/financeOperations";
import { DropDown } from "../../Common/DropDown";
import { Chart } from "./Chart";
import { StatisticsTable } from "./StatisticsTable";

const DiagramTabWrap = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const DropDownWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px;
  max-width: 280px;
  gap: 32px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const TableWrap = styled.div``;

export const DiagramTab = () => {
  const dispatch = useDispatch();

  const mounth = [
    { name: "Январь", id: 1 },
    { name: "Февраль", id: 2 },
    { name: "Март", id: 3 },
    { name: "Апрель", id: 4 },
    { name: "Май", id: 5 },
    { name: "Июнь", id: 6 },
    { name: "Июль", id: 7 },
    { name: "Август", id: 8 },
    { name: "Сентябрь", id: 9 },
    { name: "Октябрь", id: 10 },
    { name: "Ноябрь", id: 11 },
    { name: "Декабрь", id: 12 },
  ];
  const years = [
    { name: "2022", id: 1 },
    { name: "2021", id: 2 },
    { name: "2020", id: 3 },
    { name: "2019", id: 4 },
    { name: "2018", id: 5 },
    { name: "2017", id: 6 },
    { name: "2016", id: 7 },
    { name: "2015", id: 8 },
    { name: "2014", id: 9 },
    { name: "2013", id: 10 },
    { name: "2012", id: 11 },
    { name: "2011", id: 12 },
  ];

  // Обов'язкові поля для випадаючого списку: name і id
  const [selectedMounth, setSelectedMounth] = useState({});
  const [selectedYear, setSelectedYear] = useState({});
  const [currentType, setCurrentType] = useState(false);

  const { expense, revenue } = useSelector((state) => state.finance.statistics);

  useEffect(() => {
    dispatch(
      fetchStatistics({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    );
  }, []);

  useEffect(() => {
    if (
      Object.keys(selectedMounth).length > 0 &&
      Object.keys(selectedYear).length > 0
    ) {
      dispatch(
        fetchStatistics({ month: selectedMounth.id, year: selectedYear.name })
      );
    }
  }, [selectedMounth, selectedYear]);

  const handleSetStat = (value) => {
    if (currentType !== value) {
      setCurrentType(value);
    } else {
      return;
    }
  };
  return (
    <DiagramTabWrap>
      {expense && <Chart statistics={currentType ? revenue : expense} />}
      <TableWrap>
        <DropDownWrap>
          <DropDown
            options={mounth}
            selectedOption={selectedMounth}
            setSelectedOption={setSelectedMounth}
            placeholder="Месяц"
          />
          <DropDown
            options={years}
            selectedOption={selectedYear}
            setSelectedOption={setSelectedYear}
            placeholder="Год"
          />
        </DropDownWrap>
        {expense && (
          <StatisticsTable
            statistics={currentType ? revenue : expense}
            sumExpense={expense?.totalSum}
            sumIncome={revenue?.totalSum}
            handleSetStat={handleSetStat}
            currentType={currentType}
          />
        )}
      </TableWrap>
    </DiagramTabWrap>
  );
};
