import styled from "styled-components";


const TableStat=styled.div`
display: flex;
padding: 10px;
justify-content: center;
border: 1px solid white;
background-color: white;
border-radius: 4px;
margin-left: auto;
margin-right: auto;
margin-bottom: 40px;
max-width: 280px;
`;

export const StatisticsTable = () => {
  return <TableStat>Я ТАБЛИЦЯ З КАТЕГОРІЯМИ</TableStat>;
};
