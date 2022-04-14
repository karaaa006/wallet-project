import moment from "moment";
import { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { size } from "../../../utils/stylesVars";

import { useDispatch, useSelector } from "react-redux";
import { fetchNextTransactions } from "../../../redux/operations/financeOperations";
import { TailSpin } from "react-loader-spinner";
import useMediaQuery from "../../../Hooks/useMediaQuery";
import { Empty } from "../../Common/Empty";
import { clearPage } from "../../../redux/reducers/financeSlice";

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
  max-height: 300px;
  overflow: auto;
  max-width: 1000px;
  /* Scrollbar styles */

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    margin: 50px 0 10px 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #dddddd;
    border-radius: 10px;

    :hover {
      background: #cccccc;
    }
  }

  ${size.M} {
    align-items: center;
    margin-bottom: 60px;
  }
`;
const TableTransactions = styled.table`
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

const TableHead = styled.thead`
  position: sticky;
  top: 0;
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

const Loader = styled.div``;

const SpinerWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TransactionsTable = ({ transactions = [] }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  const loader = useRef(null);

  const { loading } = useSelector((state) => state.finance);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      dispatch(fetchNextTransactions());
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      dispatch(clearPage());
    };
  }, [handleObserver]);

  return (
    <div>
      {isNotMobile && (
        <ConteinerTable>
          <TableTransactions>
            <TableHead>
              <tr>
                <TableTh
                  style={{
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 30,
                  }}
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
              {transactions.map((item) => {
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
            </TableBody>
          </TableTransactions>
          <Loader ref={loader} />
          {loading && (
            <SpinerWrap>
              <TailSpin
                color="rgba(0,0,0,0.3)"
                ariaLabel="loading-indicator"
                width="35px"
              />
            </SpinerWrap>
          )}
        </ConteinerTable>
      )}

      {isMobile && (
        <>
          {transactions.map((item) => {
            return (
              <MobileTable key={item._id}>
                <tbody>
                  <MobileTr mb={item.isExpense}>
                    <MobileTh>Дата</MobileTh>
                    <MobileTd>
                      {moment(item.createdAt).format("DD.MM.YY")}
                    </MobileTd>
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

          <Loader ref={loader} />
          {loading && (
            <SpinerWrap>
              <TailSpin
                color="rgba(0,0,0,0.3)"
                ariaLabel="loading-indicator"
                width="35px"
              />
            </SpinerWrap>
          )}
        </>
      )}

      {!transactions.length && !loading && <Empty />}
    </div>
  );
};
