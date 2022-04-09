import { NavLink } from "react-router-dom";
import { ReactComponent as NavCurrency } from "../../../images/icons/NavCurrency.svg";
import { ReactComponent as NavDiagram } from "../../../images/icons/NavDiagram.svg";
import { ReactComponent as NavHome } from "../../../images/icons/NavHome.svg";

import styled, { css } from "styled-components";

const NavList = styled.div`
  display: flex;
  justify-content: center;
  &:not(:last-child):after {
    margin-right: 38px;
  }

  @media screen and (min-width: 480px) {
    flex-direction: column;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  @media screen and (min-width: 480px) {
    display: flex;
    flex-direction: row;
  }
`;

const PageText = styled.span`
  display: none;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1, 5;
  color: #000000;

  @media screen and (min-width: 480px) {
    display: block;
  }
`;

const svgStyles = () => {
  return css`
    width: 38px;
    height: 38px;
    & path {
      fill: #6e78e8;
    }
    @media screen and (min-width: 480px) {
      width: 18px;
      height: 18px;
    }
  `;
};

const HomeSvg = styled(NavHome)`
  ${(props) => svgStyles(props)}
`;
const DiagramSvg = styled(NavDiagram)`
  ${(props) => svgStyles(props)}
`;
const CurrencySvg = styled(NavCurrency)`
  ${(props) => svgStyles(props)}
`;

export default function Navigation() {
  return (
    <>
      <NavList>
        <LinkWrapper>
          <NavLink to="home">
            <HomeSvg src={NavHome} />
            <PageText>Главная</PageText>
          </NavLink>
        </LinkWrapper>

        <LinkWrapper>
          <NavLink to="diagram">
            <DiagramSvg src={NavDiagram} />
            <PageText>Статистика</PageText>
          </NavLink>
        </LinkWrapper>

        <LinkWrapper>
          <NavLink to="currency">
            <CurrencySvg src={NavCurrency} />
          </NavLink>
        </LinkWrapper>
      </NavList>
    </>
  );
}
