import { useState } from "react";
import styled from "styled-components";
import { DropDown } from "../../DropDown";
import { Chart } from "./Chart";
import { StatisticsTable } from "./StatisticsTable";

const DropDownWrap = styled.div`
  display: flex;
  gap: 32px;
`;

const TableWrap = styled.div``;

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
export const DiagramTab = () => {
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
  return (
    <>
      <Chart statistics={statistics} />
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
        <StatisticsTable />
      </TableWrap>
    </>
  );
};
