import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

const Wrap = styled.div``;
const TitleChart = styled.h2`
  font-family: "Poppins";

  font-size: 30px;
  line-height: 1.5;
`;

const ChartWrap = styled.div`
  position: relative;

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

// const ShadowPlugin = {
//   beforeDraw: (chart, args, options) => {
//     console.log(chart);
//     const { ctx } = chart;

//     console.log(ctx);
//     ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
//     ctx.shadowBlur = 10;
//     ctx.shadowOffsetX = 0;
//     ctx.shadowOffsetY = 4;
//   },
// };
// const Balance = styled.span`
//   top: 50%;
//   left: 50%;
//   position: absolute;
//   transform: translate(-50%, -50%);
//   textshadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   fontweight: 700;
//   fontsize: 18px;
//   lineheight: 27px;

//   @media screen and (min-width: 768px) {
//   }

//   @media screen and (min-width: 1280px) {
//   }
// `;

const options = {
  responsive: true,
  aspectRatio: 1,
  maintainAspectRatio: true,
  cutout: 90,
};

const styles = {
  title: {
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontWeight: "700",
    fontSize: "18px",
    lineHeight: "27px",
  },
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
    <Wrap>
      <TitleChart>Статистика</TitleChart>
      <ChartWrap>
        <Doughnut data={data} options={options} />
        <span style={styles.title}>&#8372; {balance}</span>
      </ChartWrap>
    </Wrap>
  );
};

// plugins={[ShadowPlugin]}
