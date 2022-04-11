import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  width: 320px;
  margin-top: 20px;

  font-size: 16px;
  line-height: 1.23;

  @media screen and (min-width: 768px) {
    width: 336px;
  }

  @media screen and (min-width: 1280px) {
    width: 395px;
  }
`;

const TableHead = styled.thead`
  height: 58px;
  font-size: 18px;
  background-color: white;
  align-items: center;
  position: sticky;
  top: 0;
`;

const Tableth = styled.th`
  text-align: left;
  padding: 0 20px;
  text-align: ${({ ta }) => (ta ? ta : "left")};
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
  color: ${({ c }) => (c ? c : "black")};
`;

const TableFTr = styled.tr`
  height: 52px;
  vertical-align: middle;
  transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
    font-size 250ms cubic-bezier(0.4, 0, 0.2, 1),
    font-weight 250ms cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover,
  :focus {
    cursor: pointer;
    font-size: 18px;
    font-weight: 800;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
  }
`;
export const StatisticsTable = ({
  statistics,
  sumExpense,
  sumIncome,
  handleSetStat,
}) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <Tableth
            style={{ borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}
          >
            Категория
          </Tableth>
          <Tableth
            ta="right"
            style={{
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            Сумма
          </Tableth>
        </tr>
      </TableHead>
      <tbody>
        {statistics.categories.map((stat) => (
          <TableTr key={stat.category}>
            <TableCat bgc={stat.color}>{stat.category}</TableCat>
            <TableSum>{stat.categorySum}</TableSum>
          </TableTr>
        ))}
      </tbody>
      <tfoot>
        <TableFTr onClick={() => handleSetStat(false)}>
          <TableFTd>Расходы:</TableFTd>
          <TableFTd c="#FF6596" ta="right">
            {sumExpense}
          </TableFTd>
        </TableFTr>
        <TableFTr onClick={() => handleSetStat(true)}>
          <TableFTd>Доходы:</TableFTd>
          <TableFTd c="#24CCA7" ta="right">
            {sumIncome}
          </TableFTd>
        </TableFTr>
      </tfoot>
    </Table>
  );
};
