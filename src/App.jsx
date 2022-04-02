import "normalize.css";
import { createGlobalStyle } from "styled-components";
import { mainFontFamily } from "./utils/stylesVars";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before{
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    font-family: ${mainFontFamily};
    background-color: #E7EAF2;
    background-image: url('./bg-figure-2.svg'), url('./bg-figure-1.svg');
    background-repeat: no-repeat;
    background-position: top -200px right -200px, bottom -200px left -200px;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}

export default App;
