import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInput, fetchSearched } from "../../actions";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const HeaderSearch = () => {
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
            {input ? <FontAwesomeIcon icon={faTimes} onClick={clearInput}/> : null}
        </Form>
    )
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2rem;
  width: 100%;
  border-radius: 1.5rem;
  position: relative;
  
  svg {
    position: absolute;
    right: 1rem;
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
  padding: 0.75rem 2.25rem 0.75rem 1.25rem;
  background-color: ${props => props.theme.colors.input};
  border-radius: 1.5rem;
  height: 100%;
  transition: all .25s ease;
  
  &:focus,
  &:hover {
    outline: none;
    background-color: #F8F8F8;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.inputFont};
  }
  
  &:focus::placeholder,
  &:hover::placeholder {
    color: #707070;
  }
`

export default HeaderSearch