import styled from "styled-components";

import minus from '../../../images/icons/minus.svg'
import plus from '../../../images/icons/plus.svg'

const ToggleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  padding-bottom: 20px;
  padding-top: 20px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  /* margin-bottom: 20px; */
  cursor: pointer;
`

const TextBeforeToggle = styled.p`
  color: ${({active}) => active ? '#E0E0E0' : '#24CCA7'}
`
  
const TextAfterToggle = styled.p`
  color: ${({active}) => active ? '#FF6596' : '#E0E0E0'}
`

const StyledToggle = styled.label`
margin-left: 20px;
margin-right: 20px;
position: relative;
top: -8px;
display: inline-block;
width: 80px;
height: 40px;
border: 1px solid Gray;
border-radius: 20px;
pointer-events: none;

input {
opacity: 0;
width: 0;
height: 0;
}

.slider:after {
    position: absolute;
    content: "";
    height: 44px;
    width: 44px;
    left: 36px;
    bottom: -3px;
    background: url(${minus}) center no-repeat;
    background-color: #FF6596;
    box-shadow: 0px 6px 15px rgba(255, 101, 150, 0.5);
    border-radius: 50%;
    transition: 0.1s;
}

input:checked + .slider:after {
    transform: translateX(-38px);
    background: url(${plus}) center no-repeat;
    background-color: #24CCA7;
    box-shadow: 0px 6px 15px rgba(36, 204, 167, 0.5);
}
`

export const Toggle = ({active, onChange}) => {
return (
    <ToggleWrap onClick={()=>document.getElementById("toggleTypeTransaction").click()} >
      <TextBeforeToggle active={active}>Доход</TextBeforeToggle>
      <StyledToggle>
        <input id="toggleTypeTransaction" type="checkbox" onChange={(e) => {onChange()}} />
        <span className="slider"/>
      </StyledToggle>
      <TextAfterToggle active={active} >Расход</TextAfterToggle>
    </ToggleWrap>
  );
};
