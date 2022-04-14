import styled from "styled-components";
import { RegistrationForm } from "../components/Registration/RegistrationForm";

import illustration from "../images/illustrationRegPage.png";
import { secondFontFamily, size } from "../utils/stylesVars";

const PageWrap = styled.div`
  ${size.M} {
    padding: 60px 20px;
  }

  ${size.L} {
    padding: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Illustration = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  ${size.M} {
    display: flex;
  }

  ${size.L} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }
`;

const IllustrationImg = styled.img`
  width: 250px;
  margin-right: 40px;

  ${size.L} {
    width: 420px;
    margin-bottom: 28px;
    margin-right: 0;
  }
`;

const IllustrationText = styled.div`
  font-family: ${secondFontFamily};
  font-size: 30px;
`;

const FormWrap = styled.div`
  ${size.L} {
    height: 100vh;
    width: 100%;
    padding: 20px 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(50px);
  }
`;

export default function RegistrationPage() {
  return (
    <PageWrap>
      <Illustration>
        <IllustrationImg src={illustration} />
        <IllustrationText>Finance App</IllustrationText>
      </Illustration>
      <FormWrap>
        <RegistrationForm />
      </FormWrap>
    </PageWrap>
  );
}
