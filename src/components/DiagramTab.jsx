import React, { useState } from "react";
import styled from "styled-components";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../api/api";
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

// export const fetchStatistics = createAsyncThunk(
//   "fetchStatistics",

// );

export const DiagramTab = () => {
  const [m, setM] = useState();
  const [y, setY] = useState();
  const [data, setData] = useState();
  //  data - дістати обєкт і передати пропсами в Chart
  //   const dispatch = useDispatch();
  //   const expenses = data.slice(1);
  //   console.log(expenses);

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
  //   console.log(data);

  return (
    <>
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
