import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase'

const SignUpPage = () => {
    const [email, setEmail]=useState("")
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error)
            // // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // // ...
          });
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={(e) => onSubmit(e) }> 
            <TextField value={name} label="name" variant="outlined"  onChange={(e) => {setName(e.target.value)} } />
            <TextField value={email} label="email" variant="outlined" onChange={(e) => {setEmail(e.target.value)} } />
            <TextField value={password} label="password" variant="outlined" onChange={(e) => {setPassword(e.target.value)} } />
            <input type="submit" value="送信"/>
            </form>
        </div>
    )
}

export default SignUpPage
