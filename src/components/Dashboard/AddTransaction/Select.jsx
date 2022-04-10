import styled from "styled-components";

const SelectStyled = styled.select`
border-top: none;
border-left: none;
border-right: none;
border-color: #E0E0E0;
margin-bottom: 40px;

appearance: none;
overflow: hidden;

:focus {
    outline: none;
}
`
  
export const Select = ({options=[], defaultValue="Сделайте выбор", onChange}) => {
    return (
        <SelectStyled 
        onChange={event => onChange(event)}
        >
            <option>{defaultValue}</option>
            {options.map(option => 
                <option key={option._id} value={option._id}>
                    {option.name}
                </option>
            )}
        </SelectStyled>
    )
}