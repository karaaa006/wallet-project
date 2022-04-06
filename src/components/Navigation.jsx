import { NavLink, Routes, Route, } from 'react-router-dom';
// import { Suspense } from 'react';
import Home from "../components/Home";
import Diagram from "../components/Diagram";
import { Currency } from "../components/Currency";
import NavCurrency from "../images/icons/NavCurrency.svg";
import NavDiagram from "../images/icons/NavDiagram.svg";
import NavHome from "../images/icons/NavHome.svg";
import styled from "styled-components";

const HomeSvg = styled.img`
  margin-right: 36px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
    fill: green;
  }
`;

const DiagramSvg = styled.img`
  margin-right: 36px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
    fill: green;
  }
`;

const CurrencySvg = styled.img`
  margin-right: 16px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
    fill: green;
  }
`;

export default function Navigation() {
  return (
    <nav>
      <NavLink
            to="dashboard/home"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
      ><HomeSvg src={NavHome}/>
            Главная
        
          </NavLink>
          <NavLink
            to="dashboard/diagram"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          ><DiagramSvg src={NavDiagram}/>
            Статистика
          </NavLink>
          <NavLink
            to="dashboard/currency"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          ><CurrencySvg src={NavCurrency}/>
            Курсы валют
          </NavLink>
        {/* <Suspense fallback={<Loader />}> */}
           <Routes>
            <Route path="dashboard/home" element={<Home />} />
            <Route path="dashboard/diagram" element={<Diagram />} />
            <Route path="dashboard/currency" element={<Currency />} />
          </Routes>
        {/* </Suspense> */}
    </nav>
  );
}