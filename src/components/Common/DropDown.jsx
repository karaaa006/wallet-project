import { useRef, useState } from "react";
import styled from "styled-components";

import arrow from "../../images/icons/downArrow.svg";
import { useOutsiteClick } from "../../Hooks/useOutsideClick";

const DropDownWrap = styled.div`
  position: relative;
  width: ${({ w }) => (w ? w : "100%")};
  margin: ${({ mWrap }) => (mWrap ? mWrap : "0")};
  font-size: ${({ fs }) => (fs)};
  line-height: ${({ lh }) => (lh)};
`;

const Select = styled.div`
  position: relative;
  margin: ${({ m }) => (m ? m : "0")};
  padding: ${({ p }) => (p ? p : "14px")};
  border: ${({ b }) => (b ? b : "1px solid #000000")};
  border-radius: ${({ br }) => (br ? br : "30px")};

  ${({ underline }) =>
    underline
      ? "border: none; border-bottom: 1px solid #E0E0E0; border-radius: 0"
      : ""};

  cursor: pointer;
`;

const Arrow = styled.img`
  position: absolute;
  right: 8px;
  top: ${({ iconPosTop }) => (iconPosTop ? iconPosTop : "50%")};

  transform: translateY(-50%);
`;

const OptionList = styled.ul`
  position: absolute;
  z-index: 3;
  top: calc(100% + 4px);
  width: 100%;
  max-height: 300px;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: auto;

  border-radius: 20px;

  backdrop-filter: blur(50px);
  box-shadow: 0px 6px 15px 0px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.7);

  /* Scrollbar styles */

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    margin: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #dddddd;
    border-radius: 10px;

    :hover {
      background: #cccccc;
    }
  }
`;

const Option = styled.li`
  padding: 9px;

  cursor: pointer;

  :hover {
    background-color: #ffffff;
    color: #ff6596;
  }

  transition: background-color ease 250ms;
`;

const Placeholder = styled.div`
  color: ${({ underline }) => (underline ? "#BDBDBD" : "#000000")};
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
  mWrap,
  fs,
  lh,
  iconPosTop,

  underline,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsiteClick(wrapperRef, () => setIsOpen(false));

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <DropDownWrap w={w} mWrap={mWrap} ref={wrapperRef} fs={fs} lh={lh}>
      <Select
        onClick={() => setIsOpen(!isOpen)}
        br={br}
        m={m}
        p={p}
        b={b}

        underline={underline}
      >
        {selectedOption.name ? (
          selectedOption.name
        ) : (
          <Placeholder underline={underline}>{placeholder}</Placeholder>
        )}
        <Arrow src={arrow} iconPosTop={iconPosTop}/>
      </Select>

      {isOpen && (
        <OptionList>
          {options.map((item) => {
            return (
              <Option key={item?.name} onClick={() => handleSelect(item)}>
                {item.name}
              </Option>
            );
          })}
        </OptionList>
      )}
    </DropDownWrap>
  );
};
