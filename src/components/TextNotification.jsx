import styled from "styled-components"

import { FormNotification } from "./FormNotification";

const Text = styled.span`
    position: absolute;
    color: red;
    font-size: 12px;
    margin-left: 10px;
    display: ${({ visibility }) => (visibility ? visibility : "none")};
`
export const TextNotification =({visibility, children}) => {
    return (
        <FormNotification>
            <Text visibility={visibility}>
                {children}
            </Text>
        </FormNotification>
    )
}