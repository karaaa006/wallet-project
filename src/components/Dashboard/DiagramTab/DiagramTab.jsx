import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchStatistics } from "../../../redux/operations/financeOperations";
import { size } from "../../../utils/stylesVars";
import { DropDown } from "../../Common/DropDown";
import { Chart } from "./Chart";
import { StatisticsTable } from "./StatisticsTable";
import { Empty } from "../../Common/Empty";
import { TailSpin } from "react-loader-spinner";

const DiagramTabWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  gap: 20px;
  align-items: center;

  ${size.M} {
    flex-direction: row;
    justify-content: center;
  }
`;

const DropDownWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  max-width: 280px;
  gap: 20px;
  margin-right: auto;
  margin-left: auto;
  ${size.M} {
    gap: 16px;
    flex-direction: row;
    max-width: 280px;
  }

  ${size.L} {
    gap: 32px;
    max-width: 395px;
    margin-top: 57px;
  }
`;

const Loader = styled.div``;

const SpinerWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TableWrap = styled.div``;

export const DiagramTab = () => {
  const dispatch = useDispatch();
  const loader = useRef(null);

  const mounth = [
    { name: "Январь", id: 1 },
    { name: "Февраль", id: 2 },
    { name: "Март", id: 3 },
    { name: "Апрель", id: 4 },
    { name: "Май", id: 5 },
    { name: "Июнь", id: 6 },
    { name: "Июль", id: 7 },
    { name: "Август", id: 8 },
    { name: "Сентябрь", id: 9 },
    { name: "Октябрь", id: 10 },
    { name: "Ноябрь", id: 11 },
    { name: "Декабрь", id: 12 },
  ];
  const years = [
    { name: "2022", id: 1 },
    { name: "2021", id: 2 },
    { name: "2020", id: 3 },
    { name: "2019", id: 4 },
    { name: "2018", id: 5 },
    { name: "2017", id: 6 },
    { name: "2016", id: 7 },
    { name: "2015", id: 8 },
    { name: "2014", id: 9 },
    { name: "2013", id: 10 },
    { name: "2012", id: 11 },
    { name: "2011", id: 12 },
  ];

  const [selectedMounth, setSelectedMounth] = useState({});
  const [selectedYear, setSelectedYear] = useState({});
  const [currentType, setCurrentType] = useState(false);

  const { expense = {}, revenue = {} } = useSelector(
    (state) => state.finance.statistics
  );
  const { loading } = useSelector((state) => state.finance);

  useEffect(() => {
    dispatch(
      fetchStatistics({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    );
  }, []);

  useEffect(() => {
    if (
      Object.keys(selectedMounth).length > 0 &&
      Object.keys(selectedYear).length > 0
    ) {
      dispatch(
        fetchStatistics({ month: selectedMounth.id, year: selectedYear.name })
      );
    }
  }, [selectedMounth, selectedYear]);

  const handleSetStat = (value) => {
    if (currentType !== value) {
      setCurrentType(value);
    } else {
      return;
    }
  };
  return (
    <>
      {loading ? (
        <SpinerWrap>
          <TailSpin
            color="rgba(0,0,0,0.3)"
            ariaLabel="loading-indicator"
            width="80px"
          />
        </SpinerWrap>
      ) : Object.keys(expense).length > 0 || Object.keys(revenue).length > 0 ? (
        <DiagramTabWrap>
          {expense && <Chart statistics={currentType ? revenue : expense} />}
          <TableWrap>
            <DropDownWrap>
              <DropDown
                options={mounth}
                selectedOption={selectedMounth}
                setSelectedOption={setSelectedMounth}
                placeholder="Месяц"
              />
              <DropDown
                options={years}
                selectedOption={selectedYear}
                setSelectedOption={setSelectedYear}
                placeholder="Год"
              />
            </DropDownWrap>
            {expense && (
              <StatisticsTable
                statistics={currentType ? revenue : expense}
                sumExpense={expense?.totalSum}
                sumIncome={revenue?.totalSum}
                handleSetStat={handleSetStat}
                currentType={currentType}
              />
            )}
          </TableWrap>
        </DiagramTabWrap>
      ) : (
        <>
          <DropDownWrap>
            <DropDown
              options={mounth}
              selectedOption={selectedMounth}
              setSelectedOption={setSelectedMounth}
              placeholder="Месяц"
            />
            <DropDown
              options={years}
              selectedOption={selectedYear}
              setSelectedOption={setSelectedYear}
              placeholder="Год"
            />
          </DropDownWrap>

          <Empty />
        </>
      )}
    </>
  );
};
