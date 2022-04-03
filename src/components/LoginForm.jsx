import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yap from "yup";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledForm } from "./StyledForm";
import { ButtonsWrap } from "./ButtonsWrap";

import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";

export const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onSubmit = (e) => {
    console.log(e)
  }

  return (
    <>
      <StyledForm submitFunction={onSubmit}>
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
      </StyledForm>
    </>
  );
};
