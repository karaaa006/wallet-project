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
`;
const MobileTr = styled.tr`
  height: 47px;
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


const TableTransactions = styled.table`
  width: 704px;
  border-collapse: collapse;

  @media screen and (min-width:1280px) {
    width: 715px;
}
`;

const TableHead = styled.thead`
  height: 58px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5;
`;

const TableBody = styled.tbody`
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
`;

const TableTr = styled.tr`
border-bottom: 1px solid #dcdcdf;
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.6);
  height: 52px`; 

const TableTh = styled.th`
  background: white;
`;

export const Table = () => {
  const [isTable, setIstable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width > 767) {
        setIstable(true);
      } else {
        setIstable(false);
      }
      console.log(isTable);
      console.log(window.screen.width);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
const transactions = [
  {
    "_id": "624c5bd8abee22d653d9c9e9",
    "isExpense": false,
    "category": "різне",
    "amount": 500,
    "comment": "подарунок",
    "balance": 500,
    "owner": "624beb32abee22d653d9c65f",
    "createdAt": "2022-04-05T15:10:16.702Z",
    "updatedAt": "2022-04-05T15:10:16.702Z"
  },
  {
    "_id": "624c5bf8abee22d653d9c9f5",
    "isExpense": true,
    "category": "різне",
    "amount": 100,
    "comment": "подарунок",
    "balance": 400,
    "owner": "624beb32abee22d653d9c65f",
    "createdAt": "2022-04-05T15:10:48.163Z",
    "updatedAt": "2022-04-05T15:10:48.163Z"
  },
  {
    "_id": "624c5ca5abee22d653d9ca07",
    "isExpense": false,
    "category": "регулярний дохід",
    "amount": 5000,
    "comment": "зарплата",
    "balance": 5400,
    "owner": "624beb32abee22d653d9c65f",
    "createdAt": "2022-10-25T15:13:41.399Z",
    "updatedAt": "2022-10-25T15:13:41.399Z"
  }
]
const parseDate = (date) =>{
  const newDate =new Date(date)
  const finalDate = (newDate.getDate().toString().padStart('0', 2)<9 ? "0" 
  + newDate.getDate().toString().padStart('0', 2) : newDate.getDate().toString().padStart('0', 2)) + '.' 
  + ((newDate.getMonth() < 9 ? "0"+ (newDate.getMonth() +1): newDate.getMonth() + 1) ).toString().padStart('0', 2) + '.' 
  + newDate.getFullYear().toString().slice(-2)
   
  return finalDate}

  return (
    <div>
      {isTable && (
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
              <td>{parseDate(item.createdAt)}</td>
              <td>{item.isExpense ? '-' : '+' }</td>
              <td>{item.category}</td>
              <td>{item.comment}</td>
             
              <td style = {{color: (item.isExpense) ? `#FF6596` : `#24CCA7`}}>{item.amount}</td>
              <td>{item.balance}</td>
            </TableTr>)})}
          </TableBody>
        </TableTransactions>
      )}
      {!isTable && (<>
       { transactions.map((item) => { 
        return ( 
        <MobileTable key={item._id} style = {{borderLeft: (item.isExpense) ? `5px solid #FF6596` : `5px solid #24CCA7`}}>
          <MobileTr>
            <MobileTh>Дата</MobileTh>
            <MobileTd>{parseDate(item.createdAt)}</MobileTd>
          </MobileTr>
          <MobileTr>
            <MobileTh>Тип</MobileTh>
            <MobileTd>{item.isExpense ? '+' : '-' }</MobileTd>
          </MobileTr>
          <MobileTr>
            <MobileTh>Категория</MobileTh>
            <MobileTd>{item.category}</MobileTd>
          </MobileTr>
          <MobileTr>
            <MobileTh>Комментарий</MobileTh>
            <MobileTd>{item.comment}</MobileTd>
          </MobileTr>
          <MobileTr>
            <MobileTh>Сумма</MobileTh>
            <MobileTd>{item.amount}</MobileTd>
          </MobileTr>
          <MobileTr>
            <MobileTh>Баланс</MobileTh>
            <MobileTd style = {{color: (item.isExpense) ? `#FF6596` : `#24CCA7`}}>{item.balance}</MobileTd>
          </MobileTr>
        </MobileTable>)})}</>
      )}
    </div>
  );
};
