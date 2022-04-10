import styled from "styled-components";
import { useEffect, useState } from "react";

import { FormNotification } from "./FormNotification";
import { TextNotification } from "./TextNotification";

const Background = styled.div`
  position: absolute;
  width: 100%;
  heigth: 0px;
  border: 4px solid #e5f1ef;
  border-radius: 4px;
  display: ${({ display }) => (display ? display : "none")};
`;

const StyledLine = styled.div`
  position: absolute;
  width: ${({ w }) => (w ? w : "0%")};
  heigh: 0px;
  border: 4px solid ${({ clr }) => (clr ? clr : "red")};
  box-shadow: 0px 1px 8px rgba(36, 204, 167, 0.5);
  border-radius: 4px;
  display: ${({ display }) => (display ? display : "none")};
`;

export const FormStatusbar = ({ password, validatePassword }) => {

  const [statusbarWidth, setStatusbarWidth] = useState("0");
  const [statusbarColor, setStatusbarColor] = useState("");
  const [statusbarVisibility, setStatusbarVisibility] = useState("none");
  const [passwordError, setPasswordError] = useState("");
  const [passwordNotificationVisibility, setPasswordNotificationVisibility] =
  useState("");

  useEffect(() => {
    validatePassword(passwordNotificationVisibility)
  })

  useEffect(() => {
    
    if (password.length === 0) {
      setStatusbarVisibility("none");
      setPasswordNotificationVisibility("none");
      return;
    }

    if (password.length < 6 || password.length > 12) {
      setPasswordError("Пароль должен содержать от 6 до 12 символов");
      setStatusbarVisibility("none");
      setPasswordNotificationVisibility("block");
      return;
    }

    if (password.length >= 6 && password.length <= 12) {
      setStatusbarVisibility("block");
      setPasswordNotificationVisibility("none");
    }

    const stupidPasswords = [
      "password",
      "123456",
      "1234567",
      "12345678",
      "123456789",
      "1234567890",
      "qweasd",
      "qweasdz",
      "qweasdzx",
      "qweasdzxc",
      "qwerty",
      "qwertyu",
      "qwertyui",
      "qwertyuiop",
      "qwerty123",
      "1q2w3e",
    ];

    const stupidPasswordsCheck = stupidPasswords.some(
      (pass) => pass === password
    );

    if (stupidPasswordsCheck) {
      setPasswordError("Ваш пароль находится в списке ненадежных паролей");
      setStatusbarVisibility("none");
      setPasswordNotificationVisibility("block");
      return;
    }

    const smallLetters = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
    ];
    const bigLetters = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
    ];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const specials = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "|",
      "(",
      "/",
      ")",
      ":",
      ";",
      "[",
      "]",
      "{",
      "}",
    ];

    const arr = password.split("");

    const smallLetterCheck = arr.some((simbol) => {
      return smallLetters.some((letter) => letter === simbol);
    });
    const bigLettersCheck = arr.some((simbol) => {
      return bigLetters.some((letter) => letter === simbol);
    });
    const nubmersCheck = arr.some((simbol) => {
      return numbers.some((letter) => letter === simbol);
    });
    const specialsCheck = arr.some((simbol) => {
      return specials.some((letter) => letter === simbol);
    });

    if (
      !smallLetterCheck &&
      !bigLettersCheck &&
      !nubmersCheck &&
      !specialsCheck
    ) {
      setPasswordError(
        `Пароль должен содержать буквы латинского алфавита, цифры и символы ${specials}`
      );
      setStatusbarVisibility("none");
      setPasswordNotificationVisibility("block");
    }

    let complexityCoeficient = 0;

    if (smallLetterCheck) {
      complexityCoeficient += 3.5;
    }
    if (bigLettersCheck) {
      complexityCoeficient += 3.5;
    }
    if (nubmersCheck) {
      complexityCoeficient += 3.5;
    }
    if (specialsCheck) {
      complexityCoeficient += 3.5;
    }

    const passwordComplexity = (password.length - 5) * complexityCoeficient;

    setStatusbarWidth(`${passwordComplexity}%`);

    if (passwordComplexity < 40) {
      setStatusbarColor("red");
    }
    if (passwordComplexity >= 40 && passwordComplexity < 60) {
      setStatusbarColor("orange");
    }
    if (passwordComplexity >= 60) {
      setStatusbarColor("#24CCA7");
    }
  }) 

  

  return (
    <FormNotification>
      <Background display={statusbarVisibility}></Background>
      <StyledLine w={statusbarWidth} display={statusbarVisibility} clr={statusbarColor}></StyledLine>
      <TextNotification visibility={passwordNotificationVisibility}>
              {passwordError}
            </TextNotification>
    </FormNotification>
  );
};
