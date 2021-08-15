import React, { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleUserChange = (e) => {
        setUser(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, user)
    }

    return (
        <StyledSignUp>
            <h4>Create an account</h4>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" id="email" onChange={handleEmailChange} />
                </div>
                <div className="input-field">
                    <input type="text" id="user" onChange={handleUserChange} />
                </div>
                <div className="input-field">
                    <input type="password" id="password" onChange={handlePasswordChange} />
                </div>
                <div className="input-field">
                    <button>Login</button>
                </div>
            </form>
        </StyledSignUp>
    )
}

const StyledSignUp = styled.div`
  margin: 10rem;
`

export default SignUp