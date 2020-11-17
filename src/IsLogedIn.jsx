import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from './Auth'

const IsLogedIn = (props) => {
    const {user}=useContext(AuthContext)

    return (
        user? props.children : <Redirect to={'/login'}/>
    )
}

export default IsLogedIn
