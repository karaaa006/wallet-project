import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { StyledForm } from "./StyledForm";
import { ButtonsWrap } from "./ButtonsWrap";

import mail from "../images/icons/mail.svg";
import lock from "../images/icons/lock.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/operations/userOperations";
import { validate } from "indicative/validator";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading } = useSelector((state) => state.user);

  const loginSchema = {
    email: "required|email",
    password: "required|min:6|max:12",
  };

  const handleSubmit = async () => {
    try {
      await validate({ email, password }, loginSchema);

      dispatch(fetchLogin({ email, password }));
    } catch (e) {
      e.forEach((item) => toast.error(item.message));
      console.log(e);
    }

    // validate({ email, password }, loginSchema)
    //   .then(() => {
    //     dispatch(fetchLogin({ email, password }));
    //   })
    //   .catch(console.error);
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
            disabled={!email || !password}
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
