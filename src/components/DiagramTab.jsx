import React from "react";
import styled from "styled-components";

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

export const DiagramTab = () => {
  return (
    <>
      <DiagramTabWrap>
        <TitleDiagramTab>DiagramTab</TitleDiagramTab>

        <SelectMonth id="month">
          <option value="hide">Месяц</option>
          <option value="january">Январь</option>
          <option value="february">Февраль</option>
          <option value="march">Март</option>
          <option value="april">Апрель</option>
          <option value="may">Май</option>
          <option value="june">Июнь</option>
          <option value="july">Июль</option>
          <option value="august">Август</option>
          <option value="september">Сентябрь</option>
          <option value="october">Октябрь</option>
          <option value="november">Ноябрь</option>
          <option value="december">Декабрь</option>
        </SelectMonth>
        <SelectYear id="year">
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
