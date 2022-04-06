import { NavLink, Routes, Route, } from 'react-router-dom';
// import { Suspense } from 'react';
import Home from "../components/Home";
import Diagram from "../components/Diagram";
import { Currency } from "../components/Currency";

export default function Navigation() {
  return (
    <nav>
      <NavLink
            to="dashboard/home"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Главная
          </NavLink>
          <NavLink
            to="dashboard/diagram"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
            Статистика
          </NavLink>
          <NavLink
            to="dashboard/currency"
            // className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          >
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