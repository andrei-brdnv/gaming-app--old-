import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {signUp} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

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

    const { authError } = useSelector((store => store.auth))

    const { auth } = useSelector((store => store.firebase))
    const dispatch = useDispatch()
    const onSubmit = (data) => {
        console.log(data)
        dispatch(signUp(data))
    }

    return (
        <StyledSignUp>
            <h4>Create an account</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-field">
                    <input
                        type="text"
                        name="userName"
                        placeholder="userName"
                        {...register("userName", {required: "USERNAME IS REQUIRED"})}
                    />
                </div>
                <div className="input-field">
                    <input type="text" name="email" {...register("email", {required: "EMAIL IS REQUIRED"})} />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        name="password"
                        {...register("password", { required: "PASSWORD IS REQUIRED", minLength: { value: 5, message: "Too short" }})}
                    />
                    {errors.password && errors.password.message}
                </div>



                <div className="input-field">
                    <button>Sign Up</button>
                </div>
                {authError && <p>Login failed</p>}
            </form>
        </StyledSignUp>
    )
}

const StyledSignUp = styled.div`
  margin: 10rem;
`

export default SignUp
