import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import illustration from "../../../images/currency-illustration.svg";
import { size } from "../../../utils/stylesVars";

const SpinerWrap = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  color: #ffffff;
`;

const CurrencyWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: ${({ w }) => (w ? w : "390px")};
  max-height: ${({ h }) => (h ? h : "350px")};
  min-height: 350px;
  border-radius: 30px;

  background-color: #4a56e2;
  background-image: url(${illustration});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;

  overflow: hidden;

  @media screen and (max-width: 1279px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const CurrencyTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  color: #ffffff;
`;

const CurrencyHead = styled.thead`
  font-size: 18px;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CurrencyBody = styled.tbody`
  font-size: 16px;
  font-weight: 400;
`;

const Tr = styled.tr`
  cursor: pointer;

  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  transition: background ease 250ms;
`;

const Th = styled.th`
padding: 17px 10px;
 font-weight: inherit;
${size.M} {
  padding: 17px 0;
} 
`;

const ExchangeWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  font-size: 20px;
  gap: 5px;
`;
const ExchangeCcy = styled.div`
  color: #ffffff;
`;
const Slash = styled.div`
  color: #ffffff;
`;
const ExchangeValue = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
  font-size: 15px;
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: transparent;
`;

export const Currency = ({ w, h }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [error, setError] = useState(null);
  const [activeCcy, setActiveCcy] = useState(currency[0]);
  const [firstCcy, setFirstCcy] = useState(0);
  const [secondCcy, setSecondCcy] = useState(0);

  useEffect(() => {
    const getCurrency = async () => {
      setError(null);
      setIsLoading(true);

      try {
        const res = await fetch(
          "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
        );

        const data = await res.json();

        data.forEach((item) => {
          item.buy = Number(item.buy).toFixed(2);
          item.sale = Number(item.sale).toFixed(2);
        });

        const dataWithExpiration = { data, time: Number(Date.now()) + 3600000 };

        localStorage.setItem("currency", JSON.stringify(dataWithExpiration));

        setCurrency(data);
      } catch (e) {
        console.log(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    const lsCurrency = JSON.parse(localStorage.getItem("currency"));

    if (lsCurrency && lsCurrency?.time > Number(Date.now())) {
      setCurrency(lsCurrency.data);
      setActiveCcy(lsCurrency.data[0]);
    } else {
      getCurrency();
      setActiveCcy(currency[0]);
    }
  }, []);

  const handleClickCurrency = (ccy) => {
    setActiveCcy(ccy);
    setFirstCcy(0);
    setSecondCcy(0);
  };

  const handleChangeFirstCcy = (e) => {
    const result = activeCcy.buy * e.target.value;

    setFirstCcy(e.target.value);
    setSecondCcy(result.toFixed(2));
  };
  const handleChangeSecondCcy = (e) => {
    const result = e.target.value / activeCcy.buy;

    setSecondCcy(e.target.value);
    setFirstCcy(result.toFixed(2));
  };

  return (
    <CurrencyWrap w={w} h={h}>
      {isLoading && (
        <SpinerWrap>
          <TailSpin
            color="rgba(255,255,255,0.2)"
            ariaLabel="loading-indicator"
          />
        </SpinerWrap>
      )}

      {error && <SpinerWrap>Ошибка</SpinerWrap>}

      <CurrencyTable>
        <CurrencyHead>
          <tr>
            <Th>Валюта</Th>
            <Th>Покупка</Th>
            <Th>Продажа</Th>
          </tr>
        </CurrencyHead>
        {!isLoading && !error && (
          <CurrencyBody>
            {currency.map((item, idx) => {
              return (
                <Tr key={idx} onClick={() => handleClickCurrency(item)}>
                  <Th>{item.ccy}</Th>
                  <Th>{item.buy}</Th>
                  <Th>{item.sale}</Th>
                </Tr>
              );
            })}
          </CurrencyBody>
        )}
      </CurrencyTable>
      <ExchangeWrap>
        <ExchangeCcy>{activeCcy?.ccy}</ExchangeCcy>
        <ExchangeValue
          type="text"
          value={firstCcy}
          onChange={handleChangeFirstCcy}
        />
        <Slash>=</Slash>
        <ExchangeValue
          type="text"
          value={secondCcy}
          onChange={handleChangeSecondCcy}
        />
        <ExchangeCcy>{activeCcy?.base_ccy}</ExchangeCcy>
      </ExchangeWrap>
    </CurrencyWrap>
  );
};
