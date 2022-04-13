import styled from "styled-components";
import { size } from "../../../utils/stylesVars";

const Table = styled.table`
  margin: 20px auto;
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  width: 280px;
  font-size: 16px;
  line-height: 1.23;

  ${size.M} {
    width: 336px;
  }

  ${size.L} {
    width: 395px;
  }
`;

const TableHead = styled.thead`
  height: 58px;
  width: 280px;
  font-size: 18px;
  background-color: white;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const Tableth = styled.th`
  text-align: left;
  padding: 0 20px;
  text-align: ${({ ta }) => (ta ? ta : "left")};

  :first-child {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  :last-child {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

const TableTr = styled.tr`
  position: relative;
  height: 52px;

  vertical-align: middle;

  border-bottom: 1px solid #dcdcdf;
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);
`;

const TableCat = styled.td`
  padding-left: 65px;
  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 12px;
    display: inline-block;
    width: 24px;
    height: 24px;
    background-color: ${({ bgc }) => (bgc ? bgc : `purple`)};
    border-radius: 2px;
  }
`;

const TableSum = styled.td`
  text-align: right;
  padding-right: 20px;
`;

const TableFTd = styled.td`
  font-weight: 700;
  text-align: ${({ ta }) => (ta ? ta : "left")};
  height: 40px;
  padding: 0 20px;
  color: ${({ c }) => (c ? c : "#000000")};
  transition: background-color 250ms ease;

  :first-child {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  :last-child {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

const TableFTr = styled.tr`
  height: 52px;
  vertical-align: middle;
  cursor: pointer;

  ${TableFTd} {
    background-color: ${({ active }) => (active ? "#ffffff" : "transparent")};
  }

  :hover ${TableFTd}, :focus ${TableFTd} {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

export const StatisticsTable = ({
  statistics,
  sumExpense,
  sumIncome,
  handleSetStat,
  currentType,
}) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <Tableth>Категория</Tableth>
          <Tableth ta="right">Сумма</Tableth>
        </tr>
      </TableHead>
      <tbody>
        {statistics.categories &&
          statistics?.categories?.map((stat) => (
            <TableTr key={stat.category}>
              <TableCat bgc={stat.color}>{stat.category}</TableCat>
              <TableSum>{stat.categorySum.toFixed(2)}</TableSum>
            </TableTr>
          ))}
      </tbody>
      <tfoot>
        <TableFTr onClick={() => handleSetStat(false)} active={!currentType}>
          <TableFTd>Расходы:</TableFTd>
          <TableFTd c="#FF6596" ta="right">
            {sumExpense.toFixed(2)}
          </TableFTd>
        </TableFTr>
        <TableFTr onClick={() => handleSetStat(true)} active={currentType}>
          <TableFTd>Доходы:</TableFTd>
          <TableFTd c="#24CCA7" ta="right">
            {sumIncome.toFixed(2)}
          </TableFTd>
        </TableFTr>
      </tfoot>
    </Table>
  );
};
