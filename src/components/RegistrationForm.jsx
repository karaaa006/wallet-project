import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { secondFontFamily } from "../utils/stylesVars";


import LogoSVG from "../images/logo.svg";
import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import account from "../images/icons/account.svg"

const FormWrap = styled.div`
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

const StyledRegistrationForm = styled.form`
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

export const RegistrationForm =() => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <FormWrap>
                <StyledRegistrationForm onSubmit={handleSubmit}>
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
                    <Input
                        placeholder={"Подтвердите пароль"}
                        icon={lock}
                        mb="40px"
                        type="password"
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
                    />
                    <Input
                        placeholder={"Ваше имя"}
                        icon={account}
                        mb="40px"
                        type="text"
                        value={name}
                        setValue={setName}
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
                        Регистрация
                        </Button>
                        <Button
                        w="100%"
                        mw="300px"
                        h="50px"
                        onClick={() => navigate("/")}
                        >
                        Вход
                        </Button>
                </ButtonsWrap>
                </StyledRegistrationForm>
            </FormWrap>
        </>
    )
}