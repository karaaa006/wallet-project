import styled from "styled-components";
// api/transactions/
import { useEffect, useState } from "react";

const MobileTable = styled.table`
  width: 280px;
  background: #ffffff;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;  
  border-collapse:collapse;
  overflow:hidden;
`;
const MobileTr = styled.tr`
  height: 47px;
  border-left:${({ mb }) => (!mb ? `5px solid #FF6596` : `5px solid #24CCA7`)};
`;
// style = {{borderLeft: (item.isExpense) ? `5px solid #FF6596` : `5px solid #24CCA7`}}
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
max-height: 320px;
    overflow: scroll;
    ::-webkit-scrollbar {
      width: 0px;
      background: rgba(255, 255, 255, 0.0);
    }
    `;
const TableTransactions = styled.table`
  width: 704px;
  border-collapse: collapse;
  padding-left: 20px;
  padding-right: 20px;

  @media screen and (min-width:1280px) {
    width: 715px;
}
`;

const TableHead = styled.thead`
  height: 58px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5;
  background: #FFFFFF;
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
  :not(:last-child) {border-bottom: 1px solid #dcdcdf;
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6)}`; 

const TableTh = styled.th`
  background: white;
  text-align: left;
  padding-left: 20px;
`;

const TableTdl = styled.td`
text-align: left;
padding-left: 20px;`

const TableTdR = styled.td`
text-align: right;
padding-right: 20px;`

export const Table = ({mb, }) => {
  const [isTable, setIstable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width < 767) {
        setIstable(true);
      } else {
        setIstable(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
const transactions = [
  
  {
    "_id": "624d538082620522a63e5389",
    "isExpense": true,
    "category": {
      "_id": "624c80387f49cd7760991931",
      "category": "Нерегулярный доход"
    },
    "amount": 50,
    "comment": "sdfsafd",
    "balance": 4650,
    "owner": "624beb32abee22d653d9c65f",
    "createdAt": "2022-04-06T08:46:56.420Z",
    "updatedAt": "2022-04-06T08:46:56.420Z"
  },
  
]
const parseDate = (date) =>{
  const newDate =new Date(date)
  const finalDate = (newDate.getDate().toString().padStart('0', 2)<9 ? "0" 
  + newDate.getDate().toString().padStart('0', 2) : newDate.getDate().toString().padStart('0', 2)) + '.' 
  + ((newDate.getMonth() < 9 ? "0"+ (newDate.getMonth() +1): newDate.getMonth() + 1) ).toString().padStart('0', 2) + '.' 
  + newDate.getFullYear().toString().slice(-2)
   
//   position: sticky;
//   top: 0;
  
// element.style {
//   height: 250px;
//   overflow: scroll;

  return finalDate}

  return (<div>
    <ConteinerTable>
      {!isTable && (
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
          { transactions.map((item) => {
            return (
            <TableTr key={item._id}>
              <TableTdl>{parseDate(item.createdAt)}</TableTdl>
              <TableTdl style = {{textAlign: "center"}}>{item.isExpense ? '-' : '+' }</TableTdl>
              <TableTdl>{item.category.category}</TableTdl>
              <TableTdl>{item.comment}</TableTdl>
             
              <TableTdR style = {{color: (item.isExpense) ? `#FF6596` : `#24CCA7`}}>{item.amount}</TableTdR>
              <TableTdR>{item.balance}</TableTdR>
            </TableTr>)})}
          </TableBody>
        </TableTransactions>
      )}</ConteinerTable>
      {isTable && (<>
       { transactions.map((item) => { 
        return ( 
        <MobileTable key={item._id} >
          <MobileTr mb={item.isExpense}>
            <MobileTh>Дата</MobileTh>
            <MobileTd>{parseDate(item.createdAt)}</MobileTd>
          </MobileTr>
          <MobileTr mb={item.isExpense}>
            <MobileTh>Тип</MobileTh>
            <MobileTd>{item.isExpense ? '+' : '-' }</MobileTd>
          </MobileTr>
          <MobileTr mb={item.isExpense}>
            <MobileTh>Категория</MobileTh>
            <MobileTd>{item.category.category}</MobileTd>
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
            <MobileTd style = {{color: (item.isExpense) ? `#FF6596` : `#24CCA7`}}>{item.balance}</MobileTd>
          </MobileTr>
        </MobileTable>)})}</>
      )}
    </div>
  );
};
