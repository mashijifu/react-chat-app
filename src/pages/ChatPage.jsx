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

    const logout = () => {
        firebase.auth().signOut().then(function() {
            setUser(false)
          }).catch(function(error) {
            console.log(error)
          });
    }

    // const messages = {
    //     sD9UQn27DFxitDhBIMad:{
    //         name:"",
    //         content:"",
    //     }
    // }

    return (
        <div>
            <h1>Chat</h1>
            <p>こんにちは!{userName}さん!</p>
            <hr/>
            {messages.map((message, index) => <p className="box">{message.name}:{message.content}</p>)}
            <hr/>
            <TextField
                label="message"
                variant="outlined"
                onChange={(e) => { setMessage(e.target.value) }}
              />
            <Button
                variant="contained"
                onClick={submit}
            >
                send
            </Button>
            {/* <Button onClick={logout} variant="contained" fullWidth>Logout</Button> */}
        </div>
    )
}

export default ChatPage
