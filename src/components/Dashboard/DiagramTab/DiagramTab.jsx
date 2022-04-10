import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import { DropDown } from "../../DropDown";
import { Chart } from "./Chart";
import { StatisticsTable } from "./StatisticsTable";

import { generateColor } from "../../../utils/generateColor";

import axios from "axios";
import { BASE_URL } from "../../../api/api";
axios.defaults.baseURL = BASE_URL;

// --------------Стилі
const DropDownWrap = styled.div`
  display: flex;
  gap: 32px;
`;

const TableWrap = styled.div``;

//  ______________________Для пропсов диаграммы прокидываем объет такого формата,
//  в котором обязательно должны быть category, categorySum, color, totalSum__________________
// const statistics = {
//   categories: [
//     {
//       category: "Продукты",
//       categorySum: 2050,
//       color: " rgba(254, 208, 87, 1)",
//     },
//     {
//       category: "Ежемесячные расходы",
//       categorySum: 500,
//       color: "rgba(253, 148, 152, 1)",
//     },
//     {
//       category: "Авто",
//       categorySum: 7800,
//       color: "rgba(36, 204, 167, 1)",
//     },
//   ],
//   totalSum: 10350,
// };

// Основные расходы-- #FED057
// Продукты-- #FFD8D0
// Машина-- #FD9498
// Забота о себе-- #C5BAFF
// Забота о детях-- #6E78E8
// Товары для дома-- #4A56E2
// Образование-- #81E1FF
// Досуг-- #24CCA7
// Другие расходы-- #00AD84

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
  { name: "2022", id: 2022 },
  { name: "2021", id: 2021 },
  { name: "2020", id: 2020 },
  { name: "2019", id: 2019 },
  { name: "2018", id: 2018 },
  { name: "2017", id: 2017 },
  { name: "2016", id: 2016 },
  { name: "2015", id: 2015 },
  { name: "2014", id: 2014 },
  { name: "2013", id: 2013 },
  { name: "2012", id: 2012 },
  { name: "2011", id: 2011 },
];

export const DiagramTab = () => {
  const [m, setM] = useState(new Date().getMonth() + 1);
  const [y, setY] = useState(new Date().getFullYear());

  const [revenueCategories, setRevenueCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);
  const [totalSumExp, setTotalSumExp] = useState(0);
  const [totalSumRev, setTotalSumRev] = useState(0);

  // стейт для дропдаунів
  const [selectedMounth, setSelectedMounth] = useState({});
  const [selectedYear, setSelectedYear] = useState({});

  const fetchStatistics = async ({ m, y }) => {
    try {
      const { data } = await axios.get(
        `/transactions/statistics?month=${m}&year=${y}`
      );
      separateStatistics(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const addColor = (name) => {
    switch (name) {
      case "Основные расходы":
        return "#FED057";
      case "Еда":
        return "#FFD8D0";
      case "Машина":
        return "#FD9498";
      case "Развитие":
        return "#C5BAFF";
      case "Забота о детях":
        return "#6E78E8";
      case "Товары для дома":
        return "#4A56E2";
      case "Образование":
        return "#81E1FF";
      case "Досуг":
        return "#24CCA7";
      case "Остальные":
        return "#00AD84";
      default:
        return generateColor();
    }
  };

  const separateStatistics = (data) => {
    if (Array.isArray(data)) {
      setRevenueCategories(
        data.filter((item) => !item.isExpense)[0].categories
      );
      setExpensesCategories(
        data.filter((item) => item.isExpense)[0].categories
      );
      setTotalSumRev(data.filter((item) => !item.isExpense)[0].totalSum);
      setTotalSumExp(data.filter((item) => item.isExpense)[0].totalSum);
    }
  };

  useEffect(() => {
    const getStatistics = async () => await fetchStatistics({ m, y });
    getStatistics();
  }, []);

  useEffect(() => {
    const newRevenue = revenueCategories?.map((item) => {
      const color = addColor(item.category);
      return { ...item, color };
    });
    const newExpenses = expensesCategories?.map((item) => {
      const color = addColor(item.category);
      return { ...item, color };
    });
    setRevenueCategories(newRevenue);
    setExpensesCategories(newExpenses);
  }, []);

  useEffect(() => {
    if (
      Object.keys(selectedMounth).length > 0 &&
      Object.keys(selectedYear).length > 0
    ) {
      fetchStatistics({ m: selectedMounth.id, y: selectedYear.id });
      console.log("month", selectedMounth.id);
      console.log("year", selectedYear.id);
    }
  }, [selectedMounth.id, selectedYear.id]);

  const expensesStatistics = {
    categories: [...expensesCategories],
    totalSum: totalSumExp,
  };
  const revenueStatistics = {
    categories: [...revenueCategories],
    totalSum: totalSumRev,
  };

  return (
    <>
      <Chart statistics={expensesStatistics} />

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
