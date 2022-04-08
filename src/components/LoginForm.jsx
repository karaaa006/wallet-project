import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yap from "yup";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledForm } from "./StyledForm";
import { ButtonsWrap } from "./ButtonsWrap";

import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/operations/userOperations";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useSelector((state) => state.user);

  //   const loginSchema = Yap.object({
  //     login: Yap.string().required(),
  //     password: Yap.required(),
  //   });

  const handleSubmit = () => {
    if (!email || !password) {
      alert("input email and password");
      return;
    }
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <>
      <StyledForm submitFunction={handleSubmit}>
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
            isLoading={isLoading}
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
