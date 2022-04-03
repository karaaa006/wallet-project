import styled from "styled-components";
import { secondFontFamily } from "../utils/stylesVars";

import logo from "../images/logo.svg";
import exit from "../images/icons/exit.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../redux/operations/userOperations";
import { api } from "../api/api";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;

  background-color: #ffffff;

  @media screen and (min-width: 768px) {
    padding: 20px 32px;
  }

  @media screen and (min-width: 1280px) {
    padding: 20px 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const LogoImg = styled.img`
  margin-right: 16px;

  @media screen and (min-width: 768px) {
    margin-right: 20px;
  }
`;

const LogoText = styled.div`
  font-family: ${secondFontFamily};
  font-size: 25px;
  font-weight: 700;

  @media screen and (min-width: 768px) {
    font-size: 30px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Name = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  color: #bdbdbd;

  @media screen and (min-width: 768px) {
    padding: 6px 12px 6px 0;
    border-right: 1px solid #bdbdbd;
    margin-right: 12px;
  }
`;

const ExitButton = styled.button`
  display: flex;
  color: #bdbdbd;
  background-color: transparent;
  border: none;

  cursor: pointer;
`;

const ExitIcon = styled.img`
  @media screen and (min-width: 768px) {
    margin-right: 8px;
  }
`;

const ExitText = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

export const Header = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(fetchLogout());
  };
  api.user.login({
    email: "karaulnyi@gmail.com",
    password: "123456",
  });
  return (
    <StyledHeader>
      <Logo>
        <LogoImg src={logo} />
        <LogoText>Wallet</LogoText>
      </Logo>

      <UserInfo>
        <Name>{name}</Name>
        <ExitButton onClick={handleClick}>
          <ExitIcon src={exit} />
          <ExitText>Выйти</ExitText>
        </ExitButton>
      </UserInfo>
    </StyledHeader>
  );
};
