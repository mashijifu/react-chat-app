import styled from 'styled-components'

export const StyledComponent = styled.div`
    border: 1px solid #444;
    border-radius: 4px;
    padding: 8px 16px;
    margin: 8px;

    p {
        color: ${({color}) => color ? "red" : "gray" }
        ${({color}) => color ? "textdecoration: underline" : "font-size: 30px"}
    }
`