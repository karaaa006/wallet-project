import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yap from "yup";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { secondFontFamily } from "../utils/stylesVars";

import LogoSVG from "../images/logo.svg";
import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import { api } from "../api/api";

const LoginFormWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 20px;

  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    width: 550px;
    height: auto;
    border-radius: 20px;
    margin: 0 auto;
    padding: 40px 60px 60px;
  }
`;

const StyledLoginForm = styled.form`
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;

  @media screen and (min-width: 1280px) {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

const LogoText = styled.div`
  font-family: ${secondFontFamily};
  font-weight: 700;
  font-size: 25px;

  @media screen and (min-width: 1280px) {
    font-size: 30px;
  }
`;

const ButtonsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const loginSchema = Yap.object({
  //     login: Yap.string().required(),
  //     password: Yap.required(),
  //   });
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <LoginFormWrap>
        <StyledLoginForm onSubmit={handleSubmit}>
          <Logo>
            <LogoImg src={LogoSVG} />
            <LogoText>Wallet</LogoText>
          </Logo>
          <Input
            placeholder={"E-mail"}
            icon={mail}
            mb="40px"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <Input
            placeholder={"Пароль"}
            icon={lock}
            mb="40px"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <ButtonsWrap>
            <Button
              type="submit"
              accent
              w="100%"
              mw="300px"
              h="50px"
              m="0 0 20px 0"
              p="0"
            >
              Вход
            </Button>
            <Button
              w="100%"
              mw="300px"
              h="50px"
              onClick={() => navigate("registration")}
            >
              Регистрация
            </Button>
          </ButtonsWrap>
        </StyledLoginForm>
      </LoginFormWrap>
    </>
  );
};
