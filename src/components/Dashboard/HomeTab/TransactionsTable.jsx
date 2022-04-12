import moment from "moment";
import { useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../../Hooks/useFetch";
import { size } from "../../../utils/stylesVars";

import emptyWallet from "../../../images/emptyWallet.png";

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

  ${size.M} {
    display: none;
  }
`;
const MobileTr = styled.tr`
  height: 47px;
  border-left: ${({ mb }) => (mb ? `5px solid #FF6596` : `5px solid #24CCA7`)};
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

  ${size.M} {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    width: 100%;
  }
  ${size.L} {
    display: block;

    width: 100%;
  }
`;
const TableTransactions = styled.table`
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  padding-left: 20px;
  padding-right: 20px;
  ${size.M} {
    width: 1200px;
  }

  ${size.L} {
    width: 100%;
  }
`;

const TableHead = styled.thead`
  height: 58px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5;
  background: #ffffff;
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

const TableThPr = styled.th`
  background: white;
  text-align: right;
  padding-right: 20px;
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
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(
    `https://goit-wallet-api.herokuapp.com/api/transactions`
  );

  const { loading, error, list } = useFetch(query, page);

  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
    console.log("in table", list);
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const reversedTransactions = () => [...transactions].reverse();

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
              <TableTh style={{ textAlign: "center", paddingLeft: 0 }}>
                Тип
              </TableTh>
              <TableTh>Категория</TableTh>
              <TableTh>Комментарий</TableTh>
              <TableThPr>Сумма</TableThPr>
              <TableThPr
                style={{
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                }}
              >
                Баланс
              </TableThPr>
            </tr>
          </TableHead>

          <TableBody>
            {reversedTransactions().map((item) => {
              return (
                <TableTr key={item._id}>
                  <TableTdl>
                    {moment(item.createdAt).format("DD.MM.YY")}
                  </TableTdl>
                  <TableTdl style={{ textAlign: "center", paddingLeft: 0 }}>
                    {item.isExpense ? "-" : "+"}
                  </TableTdl>
                  <TableTdl>{item.category.name}</TableTdl>
                  <TableTdl
                    style={{
                      whiteSpace: "nowrap",
                      maxWidth: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.comment}
                  </TableTdl>

                  <TableTdR
                    style={{ color: item.isExpense ? `#FF6596` : `#24CCA7` }}
                  >
                    {item.amount.toFixed(2)}
                  </TableTdR>
                  <TableTdR>{item.balance.toFixed(2)}</TableTdR>
                </TableTr>
              );
            })}
            {loading && <TableTr>Loading...</TableTr>}
            {error && <TableTr>Error!</TableTr>}
            <TableTr ref={loader} />
          </TableBody>
        </TableTransactions>
      </ConteinerTable>

      {reversedTransactions().map((item) => {
        return (
          <MobileTable key={item._id}>
            <tbody>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Дата</MobileTh>
                <MobileTd>{moment(item.createdAt).format("DD.MM.YY")}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Тип</MobileTh>
                <MobileTd>{item.isExpense ? "-" : "+"}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Категория</MobileTh>
                <MobileTd>{item.category.name}</MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Комментарий</MobileTh>
                <MobileTd
                  style={{
                    whiteSpace: "nowrap",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.comment}
                </MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Сумма</MobileTh>
                <MobileTd
                  style={{ color: item.isExpense ? `#FF6596` : `#24CCA7` }}
                >
                  {item.amount.toFixed(2)}
                </MobileTd>
              </MobileTr>
              <MobileTr mb={item.isExpense}>
                <MobileTh>Баланс</MobileTh>
                <MobileTd>{item.balance.toFixed(2)}</MobileTd>
              </MobileTr>
            </tbody>
          </MobileTable>
        );
      })}
      {!transactions.length && (
        <div style={{ textAlign: "center" }}>
          <img
            src={emptyWallet}
            alt="Empty wallet"
            height="200px"
            width="200px"
          />
          <h2>Немає даних</h2>
        </div>
      )}
    </div>
  );
};
