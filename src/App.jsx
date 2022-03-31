import { createGlobalStyle } from "styled-components";
import { mainFontFamily } from "./utils/stylesVars";
import "normalize.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import { Button } from "./components/Button";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${mainFontFamily};
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Button accent w="300px" h="50px" m="0 10px 0 0">
        Text
      </Button>
      <Button w="300px" h="50px">
        Text
      </Button>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
      </Routes>
    </>
  );
}

export default App;
