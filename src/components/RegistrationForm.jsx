import { useState } from "react";
import {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validate } from 'indicative/validator'

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
  const [emailValidation, setEmailValidation] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [statusbarWidth, setStatusbarWidth] = useState("0")
  const [statusbarColor, setStatusbarColor] = useState("")

  const rules = {
    email: 'email',
  }

  useEffect(() => {
    validate(email, rules)
      .then(setEmailValidation(true))
      .catch(setEmailValidation(false))
  }, [email])

  useEffect(() => {
    if (password.length === 0){
      setStatusbarVisibility("none")
      setPasswordNotificationVisibility("none")
      return
    }
    if (password.length <6 || password.length >12){
      setPasswordError("Пароль должен содержать от 6 до 12 символов")
      setStatusbarVisibility("none")
      setPasswordNotificationVisibility("block")
      return
    }
    if (password.length >=6 && password.length <= 12 ){
      setStatusbarVisibility("block")
      setPasswordNotificationVisibility("none")
      passwordComplexityCheck(password)
      return
    }
  }, [password])

  useEffect(() => {
    if (password.length === 0 || passwordConfirmation.length === 0){
      setPasswordConfirmationNotification("none")
      return
    }
    if (password !== passwordConfirmation){
      setPasswordConfirmationNotification("none")
      return
    }
    setPasswordConfirmationNotification("none")
  }, [password,passwordConfirmation])

  useEffect(() => {
    if (name.length === 0){
      setNameNotification("none")
      return
    }
    if (name.length > 12 || name.length < 2){
      setNameNotification("block")
      return
    }
    setNameNotification("none")
  }, [name])

  useEffect(() => {
    if (
      emailValidation &&
      nameNotification === "none" &&
      passwordConfirmationNotification === "none" &&
      passwordNotificationVisibility ==="none" &&
      passwordConfirmationNotification === "none"
    ) {
      setRegistrationPermission(true)
      return
    }
    setRegistrationPermission(false)
  })

  const passwordComplexityCheck = (password) => {
    const stupidPasswords = ["password", "123456", "1234567", "12345678", "123456789", "1234567890", "qweasd", "qweasdz", "qweasdzx", "qweasdzxc", "qwerty", "qwertyu", "qwertyui", "qwertyuiop", "qwerty123", "1q2w3e"]

    const stupidPasswordsCheck = stupidPasswords.some(pass => pass === password)

    if (stupidPasswordsCheck){
      setPasswordError("Ваш пароль находится в списке ненадежных паролей")
      setStatusbarVisibility("none")
      setPasswordNotificationVisibility("block")
      return
    }

    const smallLetters = ["q","w","e","r","t","y","u","i","o","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"]
    const bigLetters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"]
    const numbers = ["1","2","3","4","5","6","7","8","9","0"]
    const specials = ["!","@","#","$","%","^","&","*","(",")","_","-","+","=","\","|","/",",":",";","[","]","{","}"]

    const arr = password.split("")

    const smallLetterCheck = arr.some(simbol => {
      return smallLetters.some(letter => letter === simbol)
    })
    const bigLettersCheck = arr.some(simbol => {
      return bigLetters.some(letter => letter === simbol)
    })
    const nubmersCheck = arr.some(simbol => {
      return numbers.some(letter => letter === simbol)
    })
    const specialsCheck = arr.some(simbol => {
      return specials.some(letter => letter === simbol)
    })

    if (!smallLetterCheck && !bigLettersCheck && !nubmersCheck && !specialsCheck){
      setPasswordError(`Пароль должен содержать буквы латинского алфавита, цифры и символы ${specials}`)
      setStatusbarVisibility("none")
      setPasswordNotificationVisibility("block")
    }

    let complexityCoeficient = 0

    if (smallLetterCheck){
      complexityCoeficient += 3.5
    }
    if (bigLettersCheck){
      complexityCoeficient += 3.5
    }
    if (nubmersCheck){
      complexityCoeficient += 3.5
    }
    if (specialsCheck){
      complexityCoeficient += 3.5
    }
    
    const passwordComplexity = (password.length - 5) * complexityCoeficient

    setStatusbarWidth(`${passwordComplexity}%`)
    
    if (passwordComplexity < 40){
      setStatusbarColor("red")
    }
    if (passwordComplexity >= 40 && passwordComplexity < 60){
      setStatusbarColor("orange")
    }
    if (passwordComplexity >= 60){
      setStatusbarColor("#24CCA7")
    }
  }

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
            <TextNotification visibility={passwordNotificationVisibility}>{passwordError}</TextNotification>
            <FormStatusbar w={statusbarWidth} visibility={statusbarVisibility} clr={statusbarColor}></FormStatusbar>
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
