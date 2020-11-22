import React, {useState, useContext, useEffect} from 'react'
import Button from "@material-ui/core/Button"
import { AuthContext } from "../Auth"
import firebase, {db} from "../firebase"

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
        db.collection("messages").get().then((docs) => {
            const getMessages=[]
            docs.forEach((doc) => {
                getMessages.push(doc.data())
            })
            setMessages(getMessages)
        })
    }, [])

    // useEffect(() => {
    //     db.collection("messages").get().then((querySnapshot) => {
    //         const getMessages=[]
    //         querySnapshot.forEach((doc) => {
    //             getMessages.push(doc.data())
    //         })
    //         setMessages(getMessages)
    //     })
    // }, [messages])

    const logout = () => {
        firebase.auth().signOut().then(function() {
            setUser(false)
          }).catch(function(error) {
            console.log(error)
          });
    }

    return (
        <div>
            <h1>Chat</h1>
            <p>こんにちは!{userName}さん!</p>
            <hr/>
            {messages.map((message, index) => <p className="box">{message.name}:{message.content}</p>)}
            <hr/>
            <div style={{display: 'flex'}}>
                <div>
                    <TextField
                        label="message"
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
            {/* <Button onClick={logout} variant="contained" fullWidth>Logout</Button> */}
        </div>
    )
}

export default ChatPage
