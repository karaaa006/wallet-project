import styled from "styled-components"

const Text = styled.span`
    position: absolute;
    color: red;
    font-size: 12px;
    margin-left: 10px;

`
export const TextNotification =({children}) => {
    return (
        <Text>
            {children}
        </Text>
    )
}