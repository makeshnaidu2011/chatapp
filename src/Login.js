import React from 'react'
import "./Login.css"
import { Button } from "@material-ui/core"
import { auth, provider } from "./firebase"
import { useStateValue } from "./StateProvider"
import { actionTypes } from './reducer'


function Login() {
    const [{ }, dispatch] = useStateValue();
    const signIn = () => {

        auth.signInWithPopup(provider)
            .then(result => dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })).catch(error => alert(
                error.message
            ))



    };
    return (
        <div className="login">
            <div className="login__container">
                <img alt="chatapp" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F295%2F295128.png&f=1&nofb=1">

                </img>
                <div className="login__text">
                    <h1>SignIn  into Chat </h1>
                </div>
                <Button onClick={signIn}>
                    Sign In With Google
                </Button>

            </div>
        </div>
    )
}

export default Login
