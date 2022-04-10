import moment from "moment";
import styled from "styled-components";

const MobileTable = styled.table`

  width: 280px;
  background: #ffffff;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 8px;
  border-collapse: collapse;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const MobileTr = styled.tr`
  height: 47px;
  border-left: ${({ mb }) => (!mb ? `5px solid #FF6596` : `5px solid #24CCA7`)};
`;

const MobileTh = styled.th`
  text-align: start;
  padding-left: 20px;
  border-bottom: 1px solid #dcdcdf;
`;

const MobileTd = styled.td`
  text-align: end;
  padding-right: 20px;
  border-bottom: 1px solid #dcdcdf;
`;

const ConteinerTable = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    max-height: 320px;
    overflow: scroll;
    ::-webkit-scrollbar {
      width: 0px;
      background: rgba(255, 255, 255, 0);
    }
  }
`;
const TableTransactions = styled.table`
  width: 704px;
  border-collapse: collapse;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (min-width: 1280px) {
    width: 715px;
  }
`;

const TableHead = styled.thead`
  height: 58px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5;
  background: #ffffff;
  position: sticky;
  top: 0;
`;

const TableBody = styled.tbody`
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
`;

const TableTr = styled.tr`
  height: 52px;
  :not(:last-child) {
    border-bottom: 1px solid #dcdcdf;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);
  }
`;

const TableTh = styled.th`
  background: white;
  text-align: left;
  padding-left: 20px;
`;

const TableTdl = styled.td`
  text-align: left;
  padding-left: 20px;
`;

const TableTdR = styled.td`
  text-align: right;
  padding-right: 20px;
`;

export const TransactionsTable = ({ transactions = [] }) => {
  return (
    <div>
      <ConteinerTable>
        <TableTransactions>
          <TableHead>
            <tr>
              <TableTh
                style={{ borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}
              >
                Дата
              </TableTh>
              <TableTh>Тип</TableTh>
              <TableTh>Категория</TableTh>
              <TableTh>Комментарий</TableTh>
              <TableTh>Сумма</TableTh>
              <TableTh
                style={{
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                Баланс
              </TableTh>
            </tr>
          </TableHead>

          <TableBody>
            {transactions.map((item) => {
              return (
                <TableTr key={item._id}>
                  <TableTdl>
                    {moment(item.createdAt).format("DD.MM.YY")}
                  </TableTdl>
                  <TableTdl style={{ textAlign: "center" }}>
                    {item.isExpense ? "-" : "+"}
                  </TableTdl>
                  <TableTdl>{item.category.name}</TableTdl>
                  <TableTdl>{item.comment}</TableTdl>

                  <TableTdR
                    style={{ color: item.isExpense ? `#FF6596` : `#24CCA7` }}
                  >
                    {item.amount}
                  </TableTdR>
                  <TableTdR>{item.balance}</TableTdR>
                </TableTr>
              );
            })}
          </TableBody>
        </TableTransactions>
      </ConteinerTable>

      {transactions.map((item) => {
        return (
          <MobileTable key={item._id}>
            <tbody>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Дата</MobileTh>
                <MobileTd>{moment(item.createdAt).format("DD.MM.YY")}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Тип</MobileTh>
                <MobileTd>{item.isExpense ? "+" : "-"}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Категория</MobileTh>
                <MobileTd>{item.category.name}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Комментарий</MobileTh>
                <MobileTd>{item.comment}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Сумма</MobileTh>
                <MobileTd>{item.amount}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Баланс</MobileTh>
                <MobileTd
                  style={{ color: item.isExpense ? `#FF6596` : `#24CCA7` }}
                >
                  {item.balance}
                </MobileTd>
              </MobileTr>
            </tbody>
          </MobileTable>
        );
      })}
    </div>
  );
};
