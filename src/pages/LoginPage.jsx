import React from 'react'
import Button from '@material-ui/core/Button'
import {useHistory} from 'react-router-dom'

const LoginPage = () => {
    const history=useHistory()

    return (
        <div>
            <h1>Login</h1>
            <Button 
                variant="contained" 
                color="primary"
                onClick={() => history.push("/signup")}
            >
                Primary
            </Button>
        </div>
    )
}

export default LoginPage
