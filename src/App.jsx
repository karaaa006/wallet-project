import "normalize.css";
import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle } from "styled-components";
import { mainFontFamily } from "./utils/stylesVars";
import { Route, Routes, Navigate } from "react-router-dom";
import PublicRoute from "./pages/PublicRoute";
import PrivateRoute from "./pages/PrivateRoute";
import { lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiTokenConfig } from "./api/api";
import { fetchCurrentUser } from "./redux/operations/userOperations";
import { Loader } from "./components/Common/Loader";
import figure1 from "./images/bg-figure-1.svg";
import figure2 from "./images/bg-figure-2.svg";
import { Notify } from "./components/Common/Notify";

const Login = lazy(() => import("./pages/LoginPage.jsx"));
const Registration = lazy(() => import("./pages/RegistrationPage.jsx"));
const Dashboard = lazy(() => import("./pages/DashboardPage.jsx"));

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before{
    box-sizing: border-box;
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: ${mainFontFamily};
    background-color: #E7EAF2;
    background-image: url(${figure2}), url(${figure1});
    background-repeat: no-repeat;
    
    background-position: top -200px right -200px, bottom -200px left -200px;
  }
    
  #root{
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="registration"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />

          <Route element={<PrivateRoute />}>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Notify />
    </>
  );
}

export default App;
