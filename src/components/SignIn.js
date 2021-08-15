import React, { useState } from "react";
import styled from "styled-components";

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <StyledSignIn>
            <h4>Login</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" id="email" onChange={handleEmailChange} />
                </div>
                <div className="input-field">
                    <input type="password" id="password" onChange={handlePasswordChange} />
                </div>
                <div className="input-field">
                    <button>Login</button>
                </div>
            </form>
        </StyledSignIn>
    )
}

const StyledSignIn = styled.div`
  margin: 10rem;
`

export default SignIn