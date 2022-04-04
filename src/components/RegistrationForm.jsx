import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledForm } from "./StyledForm";
import { ButtonsWrap } from "./ButtonsWrap";
import { FormNotificationWrap } from "./FormNotificatinWrap";
import { FormNotification } from "./FormNotification";
import { FormStatusbar } from "./FormStatusbar";
import { TextNotification } from "./TextNotification";

import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import account from "../images/icons/account.svg";

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [registrationPermission, setRegistrationPermission] = useState(false);

  const changePasswordConfimation = (e) => {
    if (password !== e.target.value) {
      console.log("у тебя пароли разные");
      return;
    }
    console.log("все ок, регистрируйся на здоровье");
  };

  const onSubmit = (e) => {
    console.log(e);
  };

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

        <FormNotificationWrap>
          <Input
            placeholder={"Пароль"}
            icon={lock}
            mb="40px"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <FormNotification visibility={true}>
            <FormStatusbar w="50"></FormStatusbar>
          </FormNotification>
        </FormNotificationWrap>

        <FormNotificationWrap>
          <Input
            placeholder={"Подтвердите пароль"}
            icon={lock}
            mb="40px"
            type="password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            customChangeFunction={changePasswordConfimation}
          />
          <FormNotification visibility={true}>
            <TextNotification>Введенные пароли не совпадают</TextNotification>
          </FormNotification>
        </FormNotificationWrap>

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
            disabled={!registrationPermission}
          >
            Регистрация
          </Button>
          <Button w="100%" mw="300px" h="50px" onClick={() => navigate("/")}>
            Вход
          </Button>
        </ButtonsWrap>
      </StyledForm>
    </>
  );
};
