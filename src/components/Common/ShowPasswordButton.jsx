import styled from "styled-components";

import showPasswordIcon from '../../images/icons/eye.svg'
import hidePasswordIcon from '../../images/icons/eye-close.svg'

const Button = styled.button`
    position: absolute;
    right: 10px;
    bottom: 0;
    border: none;
    background-color: inherit;
`

const Icon = styled.img`
  width: 22px;
  height: 22px;
`;

export const ShowPasswordButton = ({onClick, showPassword = false}) => {

    return(
        <Button type="button" onClick={onClick}>
            <Icon src={showPassword ? showPasswordIcon : hidePasswordIcon}></Icon>
        </Button>
    )
}