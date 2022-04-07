import { Chart } from "./Chart";
import { StatisticsTable } from "./StatisticsTable";

import React, { useState } from "react";
import styled from "styled-components";
import { generateColor } from "../../../utils/generateColor";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
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

// export const fetchStatistics = createAsyncThunk(
//   "fetchStatistics",

// );

export const DiagramTab = () => {
  const [m, setM] = useState();
  const [y, setY] = useState();
  const [data, setData] = useState();
  const [categ, setCateg] = useState([]);
  const [totalExp, setTotalExp] = useState(0);

  //   const dispatch = useDispatch();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const fetchStatistics = async ({ m, y }) => {
    try {
      const { data } = await axios.get(
        `/transactions/statistics?month=${m}&year=${y}`
      );

      return setData(data);
    } catch (error) {
      return console.log(error.response.data);
    }
  };

  useEffect(() => {
    const getStatistics = () =>
      fetchStatistics({ m: currentMonth, y: currentYear });
    getStatistics();
  }, []);
  ////------------------------------------------------------------
  if (Array.isArray(data)) {
    // console.log(data);

    const revenueCategories = data[0]?.categories;
    const expensesCategories = data[1]?.categories;

    // console.log(expensesCategories);
    const totalRevenue = data[0]?.totalSum;
    const totalExpenses = data[1]?.totalSum;
    setTotalExp(totalExpenses);
    // const balance = totalRevenue - totalExpenses;
    // console.log(totalRevenue, totalExpenses, balance);

    const resultCategories = expensesCategories.map(function (elem) {
      switch (elem.category) {
        case "Основные расходы":
          return { ...elem, color: "#FED057" };
        case "Еда":
          return { ...elem, color: "#FFD8D0" };
        case "Машина":
          return { ...elem, color: "#FD9498" };
        case "Развитие":
          return { ...elem, color: "#C5BAFF" };
        case "Забота о детях":
          return { ...elem, color: "#6E78E8" };
        case "Товары для дома":
          return { ...elem, color: "#4A56E2" };
        case "Образование":
          return { ...elem, color: "#81E1FF" };
        case "Досуг":
          return { ...elem, color: "#24CCA7" };
        case "Остальные":
          return { ...elem, color: "#00AD84" };
        default:
          return { ...elem, color: generateColor() };
      }
    });

    return setCateg(resultCategories);
  }

  const stat = {
    categories: [...categ],
    totalSum: totalExp,
  };
  console.log("обэкт статистики", stat);

  // console.log("Статистика в стейті", statistic);
  return (
    <>
      <Chart statistics={stat ?? statistics} />

      <StatisticsTable />
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
      </DiagramTabWrap>
    </>
  );
};
