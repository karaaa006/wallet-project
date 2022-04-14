import styled from "styled-components";
import { secondFontFamily, size } from "../../utils/stylesVars";

import LogoSVG from "../../images/logo.svg";

const FormWrap = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  padding: 20px;

  background-color: #ffffff;

  ${size.M} {
    width: 550px;
    height: auto;
    border-radius: 20px;
    margin: 0 auto;
    padding: 40px 60px 60px;
  }
`;

const Form = styled.form.attrs(() => {
  return { novalidate: true };
})`
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;

  ${size.L} {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

const LogoText = styled.div`
  font-family: ${secondFontFamily};
  font-weight: 700;
  font-size: 25px;

  ${size.L} {
    font-size: 30px;
  }
`;

export const StyledForm = ({ children, submitFunction }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!submitFunction) {
      return;
    }
    submitFunction(e);
  };

  return (
    <>
      <FormWrap>
        <Form onSubmit={handleSubmit} noValidate>
          <Logo>
            <LogoImg src={LogoSVG} />
            <LogoText>Wallet</LogoText>
          </Logo>
          {children}
        </Form>
      </FormWrap>
    </>
  );
};
