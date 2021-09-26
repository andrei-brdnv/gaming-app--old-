import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {changeInput, fetchSearched} from "../actions";
import {useDispatch, useSelector} from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NavSearch = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const inputRef = useRef(null)
    const { searched, searchedCurrentPage } = useSelector(store => store.games)
    const handleInput = (e) => {
        setInput(e.target.value)
    }
    const submitSearch = (e) => {
        e.preventDefault()
        dispatch(changeInput(input))
        dispatch(fetchSearched(input, searchedCurrentPage))

        setInput('')
    }

    const clearInput = () => {
        setInput('')
        inputRef.current.focus()
    }

    useEffect(() => {
        if (searched.length && searchedCurrentPage < 2) {
            const element = document.querySelector("#searched").offsetTop
            console.log(element)

            window.scrollTo({
                top: element - 112
            })
        }
    }, [searched])
    return (
        <Form onSubmit={submitSearch}>
            <Input
                type="text"
                placeholder={"Search more than 500,000 games"}
                value={input}
                ref={inputRef}
                onChange={handleInput}
            />
            {/*<Button onClick={submitSearch} type='submit'>Search</Button>*/}
            {input ? <FontAwesomeIcon icon={faTimes} onClick={clearInput}/> : null}
        </Form>
    )
}

const Form = styled.form`
  display:flex;
  flex-direction:row;
  align-items: center;
  //border:1px solid black;
  margin-right: 5rem;
  padding: 0.75rem 1.25rem;
  width: 100%;
  border-radius: 1.5rem;
  background-color: #F8F8F8;
  
  svg {
    cursor: pointer;
  }

  svg:hover {
    transform: scale(1.25);
  }
`

const Input = styled.input`
  width: 100%;
  border: 0;
  line-height: 1rem;
  font-size: 1rem;
  background-size: 1rem;
  margin-right: 1rem;
  background-color: #F8F8F8;
  
  &:focus {
    outline: none;
  }
  
`

const Button = styled.button`
  border:1px solid blue;
  background:blue;
  color:white;
  
  //line-height: 2;
`

/*const Form = styled.form`
  display: flex;
  // padding: 1.3rem 0;
  width: 60rem;
  margin-right: 10rem;
  
  button, input {
    /!* reset user agent stylesheet *!/
    background-color: transparent;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: inherit;
    appearance: none;
    /!* make sure properties affecting height have same value *!/
    font-size: 1em;
    line-height: 1.2;
    padding: 0.5em var(--padding-x);
    border-width: 2px;
    border-style: solid;
  }

  button {
    font-family: "Lato", sans-serif;
    margin-left: 0.5rem;
    display: inline-flex;
    justify-content: center; /!* center the content horizontally *!/
    align-items: center; /!* center the content vertically *!/
    --padding-x: 1.2em;
    background-color: hsl(220, 90%, 56%);
    border-color: transparent; /!* hide button border *!/
    border-radius: 0.25em;
    //box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
    color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: .2s;

    &:hover {
      background-color: hsl(220, 90%, 50%);
    }

    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 2px hsla(220, 90%, 56%, 0.2);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  input {
    width: 100%;
    background-color: white;
    --padding-x: 0.5em;
    border-color: hsl(240, 1%, 83%);
    border-radius: 0.25em;
    color: hsl(240, 4%, 20%);
    transition: .2s;

    &:hover {
      border-color: hsl(240, 1%, 72%);
    }

    &:focus {
      outline: none;
      border-color: hsl(220, 90%, 56%);
      box-shadow: 0 0 0 2px hsla(220, 90%, 56%, 0.2);
    }
  }
`*/

export default NavSearch