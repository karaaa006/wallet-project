import { NavLink } from "react-router-dom";
import { secondFontFamily } from "../../../utils/stylesVars";
import { ReactComponent as NavCurrency } from "../../../images/icons/NavCurrency.svg";
import { ReactComponent as NavDiagram } from "../../../images/icons/NavDiagram.svg";
import { ReactComponent as NavHome } from "../../../images/icons/NavHome.svg";
import styled from "styled-components";

const HomeSvg = styled(NavHome)`
  width: 38px;
  height: 38px;
  border-radius: 3px;
  & path {
    fill: #6e78e8;
  }

  margin-right: 36px;

  @media screen and (min-width: 768px) {
    width: 18px;
    height: 18px;
    margin-right: 23px;
  }
`;

const HomeLink = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 12px;
`;

const PageText = styled.span`
  display: none;
  font-family: ${secondFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  color: #000000;

  @media screen and (min-width: 768px) {
    display: block;
  }
`;

const DiagramSvg = styled(NavDiagram)`
  width: 38px;
  height: 38px;
  border-radius: 3px;
  & path {
    fill: #6e78e8;
  }

  margin-right: 36px;

  @media screen and (min-width: 768px) {
    width: 18px;
    height: 18px;
    margin-right: 23px;
  }
`;

const DiagramLink = styled.div`
  display: flex;
  align-items: center;
`;

const CurrencySvg = styled(NavCurrency)`
  width: 38px;
  height: 38px;
  border-radius: 3px;
  & path {
    fill: #6e78e8;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: center;
 

  @media screen and (min-width: 768px) {
    flex-direction: column;

    padding-top: 40px;
    padding-bottom: 28px;
  }
`;

const StyledNavLink = styled(NavLink)`
  path {
    transition: fill ease 250ms;
  }

  &.active ${HomeSvg}, &.active ${DiagramSvg},&.active ${CurrencySvg} {
    box-shadow: 0px 3px 10px #4a56e2;
    path {
      fill: #4a56e2;
    }

    transition: box-shadow ease 250ms;
  }

  &.active ${PageText} {
    font-weight: 700;
  }
`;

export default function Navigation() {
  return (
    <>
      <NavList>
        <StyledNavLink to="home">
          <HomeLink>
            <HomeSvg src={NavHome} />
            <PageText>Главная</PageText>
          </HomeLink>
        </StyledNavLink>
        <StyledNavLink to="diagram">
          <DiagramLink>
            <DiagramSvg src={NavDiagram} />
            <PageText>Статистика</PageText>
          </DiagramLink>
        </StyledNavLink>
        <StyledNavLink to="currency">
          <CurrencySvg src={NavCurrency} />
        </StyledNavLink>
      </NavList>
    </>
  );
}