import styled from "styled-components";

import fillForm from "../../images/icons/fill-test-data.svg";

const Wrap = styled.button`
  position: absolute;
  right: 10px;
  bottom: 0;
  border: none;
  background-color: inherit;

  cursor: pointer;
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
`;

export const TestData = ({ onClick }) => {
  return (
    <Wrap
      title="Click for paste test user data"
      type="button"
      onClick={onClick}
    >
      <Icon src={fillForm} alt="paste test data icon" />
    </Wrap>
  );
};
