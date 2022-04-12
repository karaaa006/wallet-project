import styled from "styled-components";

import showPasswordIcon from "../images/icons/eye.svg"
import hidePasswordIcon from "../images/icons/eye-close.svg"

const Button = styled.button`
    position: absolute;
    right: 10px;
    bottom: 0;
    padding: 0;
    background-color: inherit;
    border: none;
    cursor: pointer;

    }
`

const Icon = styled.img`
  width: 22px;
  height: 22px;
  left: 8px;
  bottom: 8px;

  }
`;

export const PasswordVisibilityButton = ({
    passwordVisibility = false, 
    type = "button", 
    onClick}) => {

    return (
        <Button type={type} onClick={onClick}>
            <Icon src={passwordVisibility ? showPasswordIcon : hidePasswordIcon}/>
        </Button>
    )
}