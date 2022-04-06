import { useState } from "react";
import {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import { fetchRegistration } from "../redux/operations/userOperations";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState("");
  const [registrationPermission, setRegistrationPermission] = useState(false);
  const [passwordConfirmationNotification, setPasswordConfirmationNotification] = useState("")
  const [statusbarVisibility, setStatusbarVisibility] = useState("")
  const [passwordNotificationVisibility, setPasswordNotificationVisibility] = useState("")
  const [nameNotification, setNameNotification] = useState("")

  useEffect(() => {
    if (password.length === 0){
      setStatusbarVisibility("hidden")
      setPasswordNotificationVisibility("hidden")
      return
    }
    if (password.length <6 || password.length >12){
      setStatusbarVisibility("hidden")
      setPasswordNotificationVisibility("visible")
      return
    }
    if (password.length >=6 && password.length <= 12 ){
      setStatusbarVisibility("visible")
      setPasswordNotificationVisibility("hidden")
      return
    }
  }, [password])

  useEffect(() => {
    if (password.length === 0 || passwordConfirmation.length === 0){
      setPasswordConfirmationNotification("hidden")
      return
    }
    if (password !== passwordConfirmation){
      setPasswordConfirmationNotification("visible")
      return
    }
    setPasswordConfirmationNotification("hidden")
  }, [password,passwordConfirmation])

  useEffect(() => {
    if (name.length === 0){
      setNameNotification("hidden")
      return
    }
    if (name.length > 12){
      setNameNotification("visible")
      return
    }
    setNameNotification("hidden")
  }, [name])

  useEffect(() => {
    if (
      email.length !== 0 &&
      name.length >= 1 &&
      nameNotification === "hidden" &&
      passwordConfirmationNotification === "hidden" &&
      passwordNotificationVisibility ==="hidden" &&
      passwordConfirmationNotification === "hidden"
    ) {
      setRegistrationPermission(true)
      return
    }
    setRegistrationPermission(false)
  })


  const onSubmit = () => {
    dispatch(fetchRegistration({ name, email, password }))
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
          <FormNotification>
            <TextNotification visibility={passwordNotificationVisibility}>Пароль должен содержать от 6 до 12 символов</TextNotification>
            <FormStatusbar w="50" visibility={statusbarVisibility}></FormStatusbar>
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
          />
          <FormNotification>
            <TextNotification visibility={passwordConfirmationNotification}>Введенные пароли не совпадают</TextNotification>
          </FormNotification>
        </FormNotificationWrap>
        
        <FormNotificationWrap>
          <Input
            placeholder={"Ваше имя"}
            icon={account}
            mb="40px"
            type="text"
            value={name}
            setValue={setName}
          />
          <FormNotification>
              <TextNotification visibility={nameNotification}>Имя должно быть короче 12 символов</TextNotification>
            </FormNotification>
        </FormNotificationWrap>

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
