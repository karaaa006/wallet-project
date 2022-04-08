import styled from "styled-components";

export const StatisticsTable = ({ statistics }) => {
  return (
    <table>
      {statistics.categories.map((stat) => (
        <tr>
          <th>{stat.color}</th>
          <th>{stat.category}</th>
          <th>{stat.categorySum}</th>
        </tr>
      ))}
    </table>
  );
};
