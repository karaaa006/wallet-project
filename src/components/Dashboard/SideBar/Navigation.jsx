import { NavLink } from "react-router-dom";
import { ReactComponent as NavCurrency } from "../../../images/icons/NavCurrency.svg";
import { ReactComponent as NavDiagram } from "../../../images/icons/NavDiagram.svg";
import { ReactComponent as NavHome } from "../../../images/icons/NavHome.svg";
import styled from "styled-components";
import Media from "react-media";


const NavList = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  @media screen and (min-width: 480px) {
    flex-direction: column;
    margin-bottom: 32px;
  }
`;

const linkStyle = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
};

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

const IconWrapper = styled.div`
  svg {
    width: 38px;
    height: 38px;
    
    & path {
      fill: #6E78E8;      
    };
       
    @media screen and (min-width: 480px) {
      display:block;
      width: 18px;
      height: 18px;
      margin-right: 25px;    
    };
  };
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  
  &:hover ${PageText}{
    font-weight: 700;
  }
  &:hover ${IconWrapper}{   
      & path {
        fill: #4A56E2;         
      };
      filter: drop-shadow(2px 2px 8px rgb(110 120 232 / .7));       
      };
  }


  
  &:not(:last-child) {
    margin-right: 38px;
  }
  @media screen and (min-width: 480px) {
    display: flex;
    flex-direction: row;
     &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
`;


export default function Navigation() {
  return (

    <>
    <NavList>
      <LinkWrapper>
        <NavLink to="home" style={linkStyle}>
          <IconWrapper>
            <NavHome/>
          </IconWrapper>
          <Media query="(min-width: 480px)" render={() =>
            <PageText>Главная</PageText>
          } />

        </NavLink>
      </LinkWrapper>

      <LinkWrapper>
        <NavLink to="diagram" style={linkStyle} >
        <IconWrapper>
            <NavDiagram/>
          </IconWrapper>
          <Media query="(min-width: 480px)" render={() =>
            <PageText>Статистика</PageText>
          } />
        </NavLink>
      </LinkWrapper>

      <Media query="(max-width: 479px)" render={() =>
        <LinkWrapper>
          <NavLink to="currency">
          <IconWrapper>
            <NavCurrency/>
          </IconWrapper>
          </NavLink>
        </LinkWrapper>} />

    </NavList>
  </>
  );
}
