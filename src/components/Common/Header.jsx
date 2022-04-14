import styled from "styled-components";
import { secondFontFamily, size } from "../../utils/stylesVars";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../redux/operations/userOperations";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "./Button";

import logo from "../../images/logo.svg";
import exit from "../../images/icons/exit.svg";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;

  background-color: #ffffff;

  ${size.M} {
    padding: 20px 32px;
  }

  ${size.L} {
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

  ${size.M} {
    margin-right: 20px;
  }
`;

const LogoText = styled.div`
  font-family: ${secondFontFamily};
  font-size: 25px;
  font-weight: 700;

  ${size.M} {
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

  ${size.M} {
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
  ${size.M} {
    margin-right: 8px;
  }
`;

const ExitText = styled.div`
  display: none;

  ${size.M} {
    display: block;
  }
`;

const ModalLogout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: space-around;

  ${size.M} {
    flex-direction: row;
  }
`;

export const Header = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.user);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    setModalIsOpen(true);
  };

  return (
    <>
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
      <Modal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        title="Вы действительно хотите выйти?"
      >
        <ModalLogout>
          <Button
            w="300px"
            h="50px"
            accent
            onClick={() => dispatch(fetchLogout())}
          >
            Да
          </Button>
          <Button w="300px" h="50px" onClick={() => setModalIsOpen(false)}>
            Нет
          </Button>
        </ModalLogout>
      </Modal>
    </>
  );
};
