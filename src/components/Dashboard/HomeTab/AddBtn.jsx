import styled from "styled-components";

import { accentCl, size } from "../../../utils/stylesVars";
import plus from "../../../images/icons/plus.svg";

const PlusIcon = styled.img``;

const AddButton = styled.button`
  position: sticky;
  bottom: 20px;
  right: 20px;
  align-self: flex-end;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${accentCl};
  border: none;
  border-radius: 50%;
  padding: 0;
  box-shadow: 0px 6px 15px rgba(36, 204, 167, 0.5);
  cursor: pointer;

  :hover,
  :focus {
    background-color: #14be99;
  }

  ${size.M} {
    position: absolute;
    bottom: 40px;
    right: 40px;
  }
`;

export const AddBtn = ({ onClick }) => {
  return (
    <AddButton onClick={onClick}>
      <PlusIcon src={plus} />
    </AddButton>
  );
};
