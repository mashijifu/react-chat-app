import React, {useState} from 'react'
import {StyledComponent} from "./Message.styled"

const Message = ({message}) => {
    const [color, setColor]=useState(false)

    return (
        <StyledComponent color="pink">
            <h3>名前: {message ? message.name : "ナナシさん"}</h3>
            <p onClick={() =>{setColor(!color)}}>{message.content}</p>
            <p>{Date(message.sendAt)}</p>
        </StyledComponent>
    )
}

export default Message
