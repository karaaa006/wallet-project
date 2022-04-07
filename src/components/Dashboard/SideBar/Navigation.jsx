import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Media from "react-media";

const RouteButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  height: 75px;
  @media screen and (min-width: 768px) {
    flex-direction: column;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: column;
  }
`;
const RouteButton = styled.button`
  font-size: 15px;
  margin-bottom: 15px;
`;

export const Navigation = () => {
  return (
    <Media query="(max-width: 767px)">
      {(matches) =>
        matches ? (
          <RouteButtons>
            <RouteButton>
              <NavLink to="home">Home</NavLink>
            </RouteButton>
            <RouteButton>
              <NavLink to="diagram">Statistic</NavLink>
            </RouteButton>
            <RouteButton>
              <NavLink to="">Currensy</NavLink>
            </RouteButton>
          </RouteButtons>
        ) : (
          <RouteButtons>
            <RouteButton>
              <NavLink to="home">Home</NavLink>
            </RouteButton>
            <RouteButton>
              <NavLink to="diagram">Statistic</NavLink>
            </RouteButton>
          </RouteButtons>
        )
      }
    </Media>
  );
};
