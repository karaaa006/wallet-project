import styled from "styled-components"

const Text = styled.span`
    position: absolute;
    color: red;
    font-size: 12px;
    margin-left: 10px;
    display: ${({ visibility }) => (visibility ? visibility : "none")};
`
export const TextNotification =({visibility, children}) => {
    return (
        <Text visibility={visibility}>
            {children}
        </Text>
    )
}