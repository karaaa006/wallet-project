import styled from "styled-components"

const Wrap = styled.div`
    position: relative;
    width: 100%;
`

export const FormNotificationWrap = ({children}) => {
    return (
        <Wrap>
            {children}
        </Wrap>
    )
}