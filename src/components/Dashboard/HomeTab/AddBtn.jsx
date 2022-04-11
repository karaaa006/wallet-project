import styled from "styled-components";

import { accentCl } from "../../../utils/stylesVars";
import plus from "../../../images/icons/plus.svg";
import { Modal } from "../../Common/Modal";

const PlusIcon = styled.img``;

const AddButton = styled.button`
  position: sticky;
  bottom: 20px;
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
  cursor: pointer;

  :hover,
  :focus {
    background-color: #14be99;
  }
`;

export const AddBtn = ({ onClick }) => {
  return (
    <AddButton onClick={onClick}>
      <PlusIcon src={plus} />
    </AddButton>
  );
};
