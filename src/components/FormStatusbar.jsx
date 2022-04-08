import styled from "styled-components"

const Background = styled.div`
    position: absolute;
    width: 100%;
    heigth: 0px;
    border: 4px solid #E5F1EF;
    border-radius: 4px;
    display: ${({ visibility }) => (visibility ? visibility : "none")};
`

const StyledLine = styled.div`
    position: absolute;
    width: ${({w}) => ( w ? w : "0%")};
    heigth: 0px;
    border: 4px solid ${({clr}) => (clr ? clr : "red")};
    box-shadow: 0px 1px 8px rgba(36, 204, 167, 0.5);
    border-radius: 4px;
    display: ${({ visibility }) => (visibility ? visibility : "none")};
`

export const FormStatusbar = ({visibility, w, clr}) => {
    return (
        <>
            <Background visibility={visibility}></Background>
            <StyledLine w={w} visibility={visibility} clr={clr}></StyledLine>
        </>
    )
}

