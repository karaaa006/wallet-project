import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginForm } from "../components/Login/LoginForm";

import illustration from "../images/illustration.png";
import { secondFontFamily } from "../utils/stylesVars";

const PageWrap = styled.div`
  @media screen and (min-width: 768px) {
    padding: 60px 20px;
  }

  @media screen and (min-width: 1280px) {
    padding: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Illustration = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  @media screen and (min-width: 768px) {
    display: flex;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }
`;

const IllustrationImg = styled.img`
  width: 250px;
  margin-right: 40px;

  @media screen and (min-width: 1280px) {
    width: 420px;
    margin-bottom: 28px;
    margin-right: 0;
  }
`;

const IllustrationText = styled.div`
  font-family: ${secondFontFamily};
  font-size: 30px;
`;

const FormWrap = styled.div`
  @media screen and (min-width: 1280px) {
    height: 100vh;
    width: 100%;
    padding: 20px 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(50px);
  }
`;

export default function LoginPage() {
  return (
    <PageWrap>
      <Illustration>
        <IllustrationImg src={illustration} />
        <IllustrationText>Finance App</IllustrationText>
      </Illustration>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </PageWrap>
  );
}
