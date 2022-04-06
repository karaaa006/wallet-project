import styled from "styled-components"

const Text = styled.span`
    position: absolute;
    color: red;
    font-size: 12px;
    margin-left: 10px;
    visibility: ${({ visibility }) => (visibility ? visibility : "hidden")};
`
export const TextNotification =({visibility, children}) => {
    return (
        <Text visibility={visibility}>
            {children}
        </Text>
    )
}