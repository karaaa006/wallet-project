import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import { api } from "../api/api";

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
  width: ${({ w }) => (w ? w : "390px")};
  height: ${({ h }) => (h ? h : "350px")};
  border-radius: 30px;

  background-color: #4a56e2;
  background-image: url("./currency-illustration.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;

  overflow: hidden;
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

const Th = styled.th`
  padding: 17px 25px;
  font-weight: inherit;
`;

export const Currency = ({ w, h }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [error, setError] = useState(null);

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
    } else {
      getCurrency();
    }
  }, []);

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
                <tr key={idx}>
                  <Th>{item.ccy}</Th>
                  <Th>{item.buy}</Th>
                  <Th>{item.sale}</Th>
                </tr>
              );
            })}
          </CurrencyBody>
        )}
      </CurrencyTable>
    </CurrencyWrap>
  );
};
