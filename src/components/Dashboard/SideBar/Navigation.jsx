import styled from "styled-components";
import { NavLink } from "react-router-dom";

const RouteButtons = styled.div`
  width: 100px;
  height: 75px;
`;
const RouteButton = styled.button`
  font-size: 15px;
  margin-bottom: 15px;
`;

export const Navigation = () => {
  return (
    <RouteButtons>
      <RouteButton>
        <NavLink to="home">Home</NavLink>
      </RouteButton>
      <RouteButton>
        <NavLink to="diagram">Statistic</NavLink>
      </RouteButton>
    </RouteButtons>
  );
};
