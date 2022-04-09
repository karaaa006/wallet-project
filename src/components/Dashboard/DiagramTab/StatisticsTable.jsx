import styled from "styled-components";

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  width: 320px;
  margin-top: 20px;

  font-size: 16px;
  line-height: 1.23;
`;

const TableHead = styled.thead`
  height: 58px;

  background-color: white;
  align-items: center;
  position: sticky;
  top: 0;
`;

const Tableth = styled.th`
  text-align: left;
  padding: 0 20px;
`;

const Tablebody = styled.tbody``;

const TableTr = styled.tr`
  position: relative;
  height: 52px;

  vertical-align: middle;
  :not(:last-child) {
    border-bottom: 1px solid #dcdcdf;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);
  }
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

export const StatisticsTable = ({ statistics, bgc }) => {
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
            style={{
              borderTopRightRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            Сумма
          </Tableth>
        </tr>
      </TableHead>
      <Tablebody>
        {statistics.categories.map((stat) => (
          <TableTr key={stat.category}>
            <TableCat bgc={stat.color}>{stat.category}</TableCat>
            <TableSum>{stat.categorySum}</TableSum>
          </TableTr>
        ))}
      </Tablebody>
    </Table>
  );
};
