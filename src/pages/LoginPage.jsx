import React, {useState, useContext} from 'react'
import Button from '@material-ui/core/Button'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase'
import TextField from '@material-ui/core/TextField';
import {AuthContext} from '../Auth'

const LoginPage = () => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const history=useHistory()

    const {user, setUser}=useContext(AuthContext)

    console.log(user)

    const onSubmit = (e) => {
        e.preventDefault()
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setUser(true)
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      console.log(user)
                    }
                  });
                alert('ログインしました!')
                history.push('/chat')

            })
            .catch((error) => {
                console.log(error)
          });
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={(e) => onSubmit(e) }> 
            <TextField value={email} label="email" variant="outlined" onChange={(e) => {setEmail(e.target.value)} } />
            <TextField value={password} label="password" variant="outlined" onChange={(e) => {setPassword(e.target.value)} } />
            <input type="submit" value="送信"/>
            </form>
        </div>
    )
}

export default LoginPage
