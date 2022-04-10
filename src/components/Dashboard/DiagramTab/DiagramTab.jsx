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

const TitleDiagramTab = styled.h2`
  font-size: 30px;
  line-height: 1.5;
`;
const DiagramTabWrap = styled.div`
  position: relative;

  width: 280px;
  height: 120px;

  @media screen and (min-width: 768px) {
    width: 336px;
    height: 50px;
  }

  @media screen and (min-width: 1280px) {
    width: 395px;
    height: 50px;
  }
`;

const SelectMonth = styled.select`
  cursor: pointer;
  display: inline-block;
  width: 182px;
  height: 50px;
  background: transparent;
  color: #000000;
  padding: 12px 20px 14px 20px;
  font-family: "Circe";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #000000;
  /* box-sizing: border-box; */
  border-radius: 30px;
  margin-right: 32px;

  option {
    color: #000000;
    background-color: #ffffff73;
    display: flex;
    white-space: pre;
    font-family: "Circe";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 0px 2px 1px;
    border: none;
  }
  option:hover {
    color: #0c043b;
  }
`;

const SelectYear = styled.select`
  cursor: pointer;
  display: inline-block;
  width: 182px;
  height: 50px;
  background: transparent;
  color: #000000;
  padding: 12px 20px 14px 20px;
  font-family: "Circe";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #000000;
  /* box-sizing: border-box; */
  border-radius: 30px;

  option {
    color: #000000;
    background-color: #ffffff73;
    display: flex;
    white-space: pre;
    font-family: "Circe";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    padding: 0px 2px 1px;
    border: none;
  }
  option:hover {
    color: #0c043b;
  }
`;

// --------------Стилі
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
  const [data, setData] = useState();
  const [revenueCategories, setRevenueCategories] = useState([]);
  const [expensesCategories, setExpensesCategories] = useState([]);
  const [totalSumExp, setTotalSumExp] = useState(0);
  const [totalSumRev, setTotalSumRev] = useState(0);

  // стейт для дропдаунів
  const [selectedMounth, setSelectedMounth] = useState(m);
  const [selectedYear, setSelectedYear] = useState(y);

  //   console.log("тотал розходи", totalSumExp);
  //   console.log("тотал доходи", totalSumRev);

  //   console.log(revenueCategories);
  //   console.log(expensesCategories);

  const fetchStatistics = async ({ m, y }) => {
    try {
      const { data } = await axios.get(
        `/transactions/statistics?month=${m}&year=${y}`
      );

      separateStatistics(data);

      setData(data);
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
      console.log("data", data);
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
  }, [data]);

  useEffect(() => {
    console.log("changing");

    fetchStatistics({ m: selectedMounth.id, y: selectedYear.id });
    console.log("month", selectedMounth);
    console.log("year", selectedYear);
  }, [selectedMounth, selectedYear]);

  const expensesStatistics = {
    categories: [...expensesCategories],
    totalSum: totalSumExp,
  };
  const revenueStatistics = {
    categories: [...revenueCategories],
    totalSum: totalSumRev,
  };

  console.log("обєкт розходи", expensesStatistics);
  console.log("обєкт доходи", revenueStatistics);

  return (
    <>
      <Chart statistics={revenueStatistics} />

      <TableWrap>
        <DropDownWrap>
          <DropDown
            options={mounth}
            selectedOption={selectedMounth}
            setSelectedOption={setSelectedMounth}
            placeholder="Месяц"
            // onChange={(e) => {
            //   setM(e.target.id);
            //   if (e.target.id && y) {
            //     fetchStatistics({ m: e.target.id, y });
            //     console.log(m);
            //   }
            // }}
          />
          <DropDown
            options={years}
            selectedOption={selectedYear}
            setSelectedOption={setSelectedYear}
            placeholder="Год"
            // onChange={(e) => {
            //   setY(e.target.id);
            //   if (m && e.target.id) {
            //     fetchStatistics({ m, y: e.target.id });
            //     console.log(y);
            //   }
            // }}
          />
        </DropDownWrap>
        <StatisticsTable />
      </TableWrap>

      {/* --------------------------------------Ilona */}
      {/* <StatisticsTable />
      <DiagramTabWrap>
        <TitleDiagramTab>DiagramTab</TitleDiagramTab>

        <SelectMonth
          id="month"
          onChange={(e) => {
            setM(e.target.value);
            if (e.target.value && y) {
              fetchStatistics({ m: e.target.value, y });
              console.log(m);
            }
          }}
        >
          <option value="hide">Месяц</option>
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </SelectMonth>
        <SelectYear
          id="year"
          onChange={(e) => {
            setY(e.target.value);
            if (m && e.target.value) {
              fetchStatistics({ m, y: e.target.value });
              console.log(y);
            }
          }}
        >
          <option value="hide">Год</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </SelectYear>
      </DiagramTabWrap> */}
      {/* --------------------------------------Ilona */}
    </>
  );
};

{
  /* 
  
  // Обов'язкові поля для випадаючого списку: name і id

  
 
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
      </TableWrap> */
}
