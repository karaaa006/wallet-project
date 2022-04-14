import { NavLink } from "react-router-dom";
import { secondFontFamily, size } from "../../../utils/stylesVars";
import styled from "styled-components";
import Media from "react-media";
import SVG from "react-inlinesvg";
import NavHome from "../../../images/icons/NavHome.svg";
import NavDiagram from "../../../images/icons/NavDiagram.svg";
import NavCurrency from "../../../images/icons/NavCurrency.svg";

const Svg = styled(SVG)`
  width: 38px;
  height: 38px;
  border-radius: 3px;
  & path {
    fill: #6e78e8;
  }
  ${size.M} {
    width: 18px;
    height: 18px;
  }
`;

const PageText = styled.span`
  font-family: ${secondFontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  ${size.M} {
    display: block;
  }
`;

const NavList = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
    & :not(:last-child) {
      margin-right: 32px;
    }
  }

  ${size.M} {
    margin-right: 0;
    margin-bottom: 28px;
    flex-direction: column;

    & :not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  path {
    transition: fill ease 250ms;
  }

  &.active SVG {
    box-shadow: 0px 3px 10px #4a56e2;
    path {
      fill: #4a56e2;
    }
    transition: box-shadow ease 250ms;
  }
  &.active ${PageText} {
    font-weight: 700;
  }

  ${size.M} {
    & :not(:last-child) {
      margin-right: 20px;
    }
  }
`;

export default function Navigation() {
  return (
    <NavList>
      <StyledNavLink to="home">
        <Svg src={NavHome} />
        <Media
          query="(min-width: 768px)"
          render={() => <PageText>Главная</PageText>}
        />
      </StyledNavLink>
      <StyledNavLink to="diagram">
        <Svg src={NavDiagram} />

        <Media
          query="(min-width: 768px)"
          render={() => <PageText>Статистика</PageText>}
        />
      </StyledNavLink>
      <Media
        query="(max-width: 767px)"
        render={() => (
          <StyledNavLink to="currency">
            <Svg src={NavCurrency} />
          </StyledNavLink>
        )}
      />
    </NavList>
  );
}
