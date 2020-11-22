import React, {useState} from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Auth from './Auth'
import IsLogedIn from './IsLogedIn'
import LoginCheck from './LoginCheck'

function App() {
    const [state, setState]=useState()

    return (
        <Auth>
            <BrowserRouter>
                <LoginCheck />
                <Link to="/chat">Chat</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">signup</Link>
                <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/signup" component={SignUpPage} />
                    <IsLogedIn>
                        <Route exact path="/chat" component={ChatPage} />
                    </IsLogedIn>
                </Switch>
            </BrowserRouter>
        </Auth>
    );
}

export default App;
