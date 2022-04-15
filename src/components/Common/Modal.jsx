import styled from "styled-components";
import { useEffect } from "react";
import close from "../../images/icons/close.svg";
import { size } from "../../utils/stylesVars";

const Backdrop = styled.div`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: #ffffff;

  ${size.M} {
    top: -80px;
    background-color: rgba(0, 0, 0, 0.25);
  }
`;
const ModalWrap = styled.div`
  position: absolute;

  ${size.M} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 40px 75px;
    border-radius: 20px;
  }
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  flex-direction: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
  width: ${({ w }) => w || "auto"};
  height: ${({ h }) => h || "auto"};
  background-color: #ffffff;

  @media screen and (max-width: 767px) {
    width: 100vw;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    padding: 20px 20px 40px 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  padding: 0;

  cursor: pointer;
`;
const CloseIcon = styled.img`
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: ${({ mb }) => mb || "40px"};
  text-align: center;

  @media screen and (max-width: 767px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const Modal = ({
  children,
  isOpen,
  setIsOpen,
  title,
  w,
  h,
  mb = 40,
  justify,
  align,
  direction,
}) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    if (isOpen && document.documentElement.clientWidth < 768) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Backdrop onClick={handleClose} isOpen={isOpen}>
      <ModalWrap
        onClick={(e) => e.stopPropagation()}
        tabIndex="0"
        w={w}
        h={h}
        justify={justify}
        align={align}
        direction={direction}
      >
        <CloseButton onClick={handleClose}>
          <CloseIcon src={close} />
        </CloseButton>
        {title && <Title mb={mb}>{title}</Title>}
        {children}
      </ModalWrap>
    </Backdrop>
  );
};
