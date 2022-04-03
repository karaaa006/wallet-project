import "normalize.css";
import { createGlobalStyle } from "styled-components";
import { mainFontFamily } from "./utils/stylesVars";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import PublicRoute from "./pages/PublicRoute";
import PrivateRoute from "./pages/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiTokenConfig } from "./api/api";
import { fetchCurrentUser } from "./redux/operations/userOperations";

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
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      apiTokenConfig.set(token);

      dispatch(fetchCurrentUser());
    };
    if (token) {
      getUser();
    }
  }, []);
  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="registration"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
