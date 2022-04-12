import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "indicative/validator";
import { toast } from "react-toastify";

import { Button } from "../Common/Button";
import { Input } from "../Utils/Input";
import { StyledForm } from "../Utils/StyledForm";
import { ButtonsWrap } from "../Utils/ButtonsWrap";
import { FormStatusbar } from "../Common/FormStatusbar";
import { TextNotification } from "../Common/TextNotification";

import mail from "../../images/icons/mail.svg";
import lock from "../../images/icons/lock.svg";
import account from "../../images/icons/account.svg";
import { fetchRegistration } from "../../redux/operations/userOperations";

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [registrationPermission, setRegistrationPermission] = useState(false);
  const [
    passwordConfirmationNotification,
    setPasswordConfirmationNotification,
  ] = useState("");

  const [nameNotification, setNameNotification] = useState("");
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState("");

  const { isLoading} = useSelector((state) => state.user);

  const rules = {
    email: "email",
  };

  const validateEmail = async () => {
    try {
      await validate({ email }, rules);
      setEmailValidation(true);
    } catch (e) {
      setEmailValidation(false);
    }
  };

  const validatePassword = (result) => {
    setPasswordValidation(result);
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    if (password.length === 0 || passwordConfirmation.length === 0) {
      setPasswordConfirmationNotification("none");
      return;
    }
    if (password !== passwordConfirmation) {
      setPasswordConfirmationNotification("block");
      return;
    }
    setPasswordConfirmationNotification("none");
  }, [password, passwordConfirmation]);

  useEffect(() => {
    if (name.length === 0) {
      setNameNotification("none");
      return;
    }
    if (name.length > 12) {
      setNameNotification("block");
      return;
    }
    setNameNotification("none");
  }, [name]);

  useEffect(() => {
    if (
      email &&
      emailValidation &&
      name &&
      nameNotification === "none" &&
      password &&
      passwordValidation === "none" &&
      passwordConfirmation &&
      passwordConfirmationNotification === "none"
    ) {
      setRegistrationPermission(true);
      return;
    }
    setRegistrationPermission(false);
  });

  const onSubmit = async () => {
    try {
      dispatch(fetchRegistration({ name, email, password }));
    } catch (e) {
      e.forEach((item) => toast.error(item.message));
      console.log(e);
    }
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


          <Input
            placeholder={"Пароль"}
            icon={lock}
            mb="40px"
            type="password"
            value={password}
            setValue={setPassword}
          >
            <FormStatusbar
            password={password}
            validatePassword={validatePassword}
            ></FormStatusbar>
          </Input>

          <Input
            placeholder={"Подтвердите пароль"}
            icon={lock}
            mb="40px"
            type="password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
          >
            <TextNotification visibility={passwordConfirmationNotification}>
            Введенные пароли не совпадают
            </TextNotification>
          </Input>

          <Input
            placeholder={"Ваше имя"}
            icon={account}
            mb="40px"
            type="text"
            value={name}
            setValue={setName}
          >
            <TextNotification visibility={nameNotification}>
              Имя должно быть короче 12 символов
            </TextNotification>
          </Input>

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
            isLoading={isLoading}
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
