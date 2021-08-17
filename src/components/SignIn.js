import React, { useState } from "react";
import styled from "styled-components";
import { signIn } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { authError } = useSelector((store => store.auth))

    const { auth } = useSelector((store => store.firebase))


    const onSubmit = (data) => {
        console.log(data)
        dispatch(signIn(data))
    }

    if (auth.uid) return <Redirect to={"/"} />

    return (
        <StyledSignIn>
            <h4>Login</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <button>Login</button>
                </div>
                {authError && <p>Login failed</p>}
            </form>
        </StyledSignIn>
    )
}

const StyledSignIn = styled.div`
  margin: 10rem;
`

export default SignIn
