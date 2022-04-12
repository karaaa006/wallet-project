import styled from "styled-components";

const InputWrap = styled.div`
  position: relative;
  width: ${({ w }) => (w ? w : "auto")};

  margin: ${({ m }) => (m ? m : "0")};
  margin-top: ${({ mt }) => (mt ? mt : "0")};
  margin-left: ${({ ml }) => (ml ? ml : "0")};
  margin-bottom: ${({ mb }) => (mb ? mb : "0")};
  margin-right: ${({ mr }) => (mr ? mr : "0")};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: ${({ p }) => (p ? p : "8px")};
  padding-left: ${({ icon }) => (icon ? "52px" : "8px")};
  color: ${({ c }) => (c ? c : "#000000")};
  border: none;
  border-bottom: 1px solid #e0e0e0;

  transition: border ease 250ms;

  ::placeholder {
    color: #bdbdbd;
  }

  :focus {
    outline: none;
    border-bottom-color: #000;
  }
`;

const Icon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 8px;
  bottom: 8px;
`;

export const Input = ({
  m,
  mt,
  ml,
  mr,
  mb,
  p,
  ta,
  w,
  h,
  icon,
  c,

  value,
  setValue,
  customInputFunction,
  customChangeFunction,
  placeholder,
  type,
  children,
  autoComplete = "off",

  validateSchema,
}) => {
  //   const [isValid, setIsValid] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;

    setValue(value);

    if (!customChangeFunction) {
      return;
    }
    customChangeFunction(e);
  };

  const onInput = (e) => {
    if (!customInputFunction) {
      return;
    }
    customInputFunction(e);
  };

  //   const handleBlur = (e) => {
  //     if (validateSchema) {
  //       setIsValid(validateSchema);
  //     }
  //   };

  return (
    <InputWrap w={w} m={m} mt={mt} mb={mb} ml={ml} mr={mr}>
      <StyledInput
        onChange={handleChange}
        // onBlur={handleBlur}
        onInput={onInput}
        value={value}
        p={p}
        ta={ta}
        h={h}
        icon={icon}
        c={c}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
      />
      {icon && <Icon src={icon} />}
      {children}
    </InputWrap>
  );
};
