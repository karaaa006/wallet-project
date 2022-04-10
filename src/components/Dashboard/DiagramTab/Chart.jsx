import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const ChartWrap = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 32px;
  width: 280px;
  height: 280px;
  

  @media screen and (min-width: 768px) {
    width: 336px;
    height: 336px;
  }

  @media screen and (min-width: 1280px) {
    width: 288px;
    height: 288px;
  }
`;

const Balance = styled.span`
  top: 50%;
  left: 50%;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);

  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;
`;

const options = {
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: true,
  cutout: 90,
};

export const Chart = ({ statistics }) => {
  const balance = String(statistics.totalSum.toFixed(2));
  const sums = statistics.categories.map((item) => item.categorySum);
  const categories = statistics.categories.map((item) => item.category);
  const colors = statistics.categories.map((item) => item.color);

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
      <Doughnut data={data} options={options} />
      <Balance>&#8372; {balance}</Balance>
    </ChartWrap>
  );
};
