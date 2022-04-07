import { useState } from "react";
import styled from "styled-components";

import arrow from "../images/icons/downArrow.svg";

const DropDownWrap = styled.div`
  position: relative;
  width: ${({ w }) => (w ? w : "auto")};
`;

const Select = styled.div`
  position: relative;
  margin: ${({ m }) => (m ? m : "0")};
  padding: ${({ p }) => (p ? p : "14px")};
  border: ${({ b }) => (b ? b : "1px solid #000000")};
  border-radius: ${({ br }) => (br ? br : "30px")};

  cursor: pointer;
`;

const Arrow = styled.img`
  position: absolute;
  right: 8px;
  top: 50%;

  transform: translateY(-50%);
`;

const OptionList = styled.ul`
  position: absolute;
  z-index: 1;
  top: calc(100% + 4px);
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;

  border-radius: 20px;

  backdrop-filter: blur(100px);
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.7);
`;

const Option = styled.li`
  padding: 20px;

  cursor: pointer;

  :hover {
    background-color: #ffffff;
    color: #ff6596;
  }

  transition: background-color ease 250ms;
`;

const Placeholder = styled.div`
  color: ${({ placeholderColor }) =>
    placeholderColor ? placeholderColor : "#BDBDBD"};
`;

export const DropDown = ({
  options,
  selectedOption,
  setSelectedOption,

  placeholder,
  w,
  m,
  p,
  b,
  br,
  placeholderColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropDownWrap w={w}>
      <Select onClick={() => setIsOpen(!isOpen)} br={br} m={m} p={p} b={b}>
        {selectedOption.name ? (
          selectedOption.name
        ) : (
          <Placeholder placeholderColor={placeholderColor}>
            {placeholder}
          </Placeholder>
        )}
        <Arrow src={arrow} />
      </Select>

      {isOpen && (
        <OptionList>
          {options.map((item) => {
            return (
              <Option key={item?.id} onClick={() => handleSelect(item)}>
                {item.name}
              </Option>
            );
          })}
        </OptionList>
      )}
    </DropDownWrap>
  );
};
