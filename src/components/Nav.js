import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Link, animateScroll } from "react-scroll";
import { debounce } from "../utils/debounce";
import { fetchSearched } from "../actions";
import ThemeSwitcher from "./ThemeSwitcher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const submitSearch = (e) => {
        e.preventDefault()
        dispatch(fetchSearched(input))
        setInput('')
    }

    const handleScroll = debounce(() => {
        // find current scroll position
        const currentScrollPos = window.pageYOffset;

        // set state based on location info
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30));

        // set state to new scroll position
        setPrevScrollPos(currentScrollPos);
    }, 150);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <div>
            <StyledNav visible={visible}>
                <Logo>
                    <h3 onClick={() => animateScroll.scrollToTop()}>Gaming app</h3>
                </Logo>
                <Form>
                    <input value={input} onChange={handleInput} type='text' />
                    <button onClick={submitSearch} type='submit'>Search</button>


                </Form>
                <div>
                    <FontAwesomeIcon icon={faEllipsisH} title={"More"} />
                </div>
            </StyledNav>
        </div>
    )
}

const StyledNav = styled.div(props => ({
  position: 'fixed',
  top: props.visible ? '0' : '-6rem',
  left: '0',
  width: '100%',
  height: '5rem',
  margin: '0 auto',
  background: '#ffa726',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.25);',
  zIndex: '15',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0 2rem',
  transition: 'all 0.5s',
}));

const Logo = styled.div`
  display: flex;

  h3 {
    margin: 1.5rem 0;
    padding: 0;
    width: 12rem;
    background-color: yellow;
  }
`

const Form = styled.form`
  display: flex;
  // padding: 1.3rem 0;
  width: 60rem;
  margin-right: 10rem;
  button, input {
    /* reset user agent stylesheet */
    background-color: transparent;
    padding: 0;
    border: 0;
    border-radius: 0;
    color: inherit;
    appearance: none;
    /* make sure properties affecting height have same value */
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
    justify-content: center; /* center the content horizontally */
    align-items: center; /* center the content vertically */
    --padding-x: 1.2em;
    background-color: hsl(220, 90%, 56%);
    border-color: transparent; /* hide button border */
    border-radius: 0.25em;
    box-shadow: 0 1px 4px hsla(220, 90%, 37%, 0.25);
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
`

export default Nav