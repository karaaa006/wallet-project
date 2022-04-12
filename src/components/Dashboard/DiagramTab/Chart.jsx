import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { secondFontFamily } from "../../../utils/stylesVars";

const ChartWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
  width: 280px;
  /* height: 280px; */

  @media screen and (min-width: 768px) {
    width: 336px;
    height: 336px;
    margin-bottom: 40px;
  }

  @media screen and (min-width: 1280px) {
    width: 288px;
    height: 288px;
    padding-right: 32px;
  }
`;

const Balance = styled.span`
  top: 65%;
  left: 50%;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);

  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;

  @media screen and (min-width: 768px) {
    top: 60%;
    left: 45%;
  }

  @media screen and (min-width: 1280px) {
    top: 65%;
    left: 45%;
  }
`;

const StatisticName = styled.p`
margin: 0 auto;
font-family: ${secondFontFamily};
font-style: normal;
font-weight: 400;
font-size: 30px;
line-height: 30px;
display: flex;
align-items: center;
text-align: center;
color: #000000;
padding-top: 60px;
padding-bottom: 25px;

  @media screen and (min-width: 768px) {
    padding-top: 0px;
  }

`;

const options = {
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: true,
  cutout: 90,
  radius: "98%",
};

export const Chart = ({ statistics }) => {
  const balance = String(statistics?.totalSum?.toFixed(2));
  const sums = statistics?.categories?.map((item) => item.categorySum) ?? [];
  const categories = statistics?.categories?.map((item) => item.category) ?? [];
  const colors = statistics?.categories?.map((item) => item.color) ?? [];

  Legend.defaults.display = false;
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [...categories],
    datasets: [
      {
        label: "# of Votes",
        data: [...sums],
        backgroundColor: [...colors],
        borderColor: [...colors],
        borderWidth: 2,
        hoverOffset: 2,
      },
    ],
  };

  return (
    <ChartWrap>
      <StatisticName>Статистика</StatisticName>
      <Doughnut data={data} options={options} />
      <Balance>&#8372; {balance}</Balance>
    </ChartWrap>
  );
};
