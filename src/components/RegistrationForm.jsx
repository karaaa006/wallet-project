import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledForm } from "./StyledForm";
import { ButtonsWrap } from "./ButtonsWrap";

import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import account from "../images/icons/account.svg"

export const RegistrationForm =() => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [name, setName] = useState("");

    const changePasswordConfimation = (e) => {
      console.log(password)
      console.log(e.target.value)
      if (password !== e.target.value){
        console.log('у тебя пароли разные')
        return
      }
      console.log('все ок, регистрируйся на здоровье')
    }

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
            <Input
                placeholder={"Подтвердите пароль"}
                icon={lock}
                mb="40px"
                type="password"
                value={passwordConfirmation}
                setValue={setPasswordConfirmation}
                customChangeFunction={changePasswordConfimation}
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
          </StyledForm>
        </>
    )
}