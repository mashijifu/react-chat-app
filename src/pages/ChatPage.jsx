import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from "../Auth"
import firebase, {db} from "../firebase"
import Message from "../Message/Message"

import styles from "../Chat.module.scss"
import styled from "styled-components"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const ChatPage = () => {
    const { setUser } = useContext(AuthContext)
    const [userName, setUserName]=useState("")
    const [message, setMessage]=useState("")
    const [messages, setMessages]=useState([])

    const submit = () => {
        db.collection("messages").add({
            name: userName,
            content: message,
            sendAt: Date.now(),
        })
        .then(function(docRef) {
            console.log("成功！");
        })
        .catch(function(error) {
            console.error("失敗");
        });
        
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUserName(user.displayName)
        });
    }, [])

    useEffect(() => {
        db.collection("messages").onSnapshot((docs) => {
            const getMessages=[]
            docs.forEach((doc) => {
                getMessages.push(doc.data())
            })
            getMessages.sort((a, b) => {
                if (a.sendAt < b.sendAt) return 1;
                if (a.sendAt > b.sendAt) return -1;
                return 0;
            });
            setMessages(getMessages)
        })
    }, [])

    const logout = () => {
        firebase.auth().signOut().then(function() {
            setUser(false)
          }).catch(function(error) {
            console.log(error)
          });
    }

    const jsStyle = {
        color: "blue",
        backgroundColor: "orange",
    }

    const StyledComponent = styled.div`
        p {
            border: 1px solid #444;
            border-radius: 4px;
            margin: 8px;
        }
    `

    return (
        <div>
            <h1 className={styles.title}>Chat</h1>
            <p style={jsStyle}>こんにちは!{userName}さん!</p>
            <hr/>
            {messages.map((message, index) => 
                <Message key={index} message={message} />
            )}
            <hr/>
            <div style={{display: 'flex'}}>
                <div>
                    <TextField
                        label="Message"
                        variant="outlined"
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }}
                    />

                </div>
                <div style={{marginLeft: '20px', lineHeight: '53px'}}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={submit}
                    >
                        send
                    </Button>

                </div>
            </div>
            <Button onClick={logout} variant="contained" fullWidth>Logout</Button>
        </div>
    )
}

export default ChatPage
