import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { debounce } from "../utils/debounce";
import { changeInput, fetchSearched, signOut } from "../actions";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import User from "../images/profile-user.png";
import NavSearch from "./NavSearch";
import Navbar from "./Navbar";

const Nav = () => {
    const dispatch = useDispatch()
    //const [input, setInput] = useState('')
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    /*const handleInput = (e) => {
        setInput(e.target.value)
    }

    const { searched, searchedCurrentPage } = useSelector(store => store.games)

    const submitSearch = (e) => {
        e.preventDefault()
        dispatch(changeInput(input))
        dispatch(fetchSearched(input, searchedCurrentPage))

        setInput('')
    }*/

    const { auth } = useSelector(store => store.firebase)
    const handleLogout = () => {
        dispatch(signOut())
    }

    /*useEffect(() => {
        if (searched.length && searchedCurrentPage < 2) {
            const element = document.querySelector("#searched").offsetTop
            console.log(element)

            window.scrollTo({
                top: element - 112
            })
        }
    }, [searched])*/

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
        <>
            <StyledNav visible={visible}>
                <Logo>
                    <h3 onClick={() => animateScroll.scrollToTop()}>Gaming app</h3>
                </Logo>
                <NavSearch />
                {/*<Form>
                    <input value={input} onChange={handleInput} type='text' />
                    <button onClick={submitSearch} type='submit'>Search</button>

                </Form>*/}

                <Navbar />

                {/*{auth.uid ?
                    <DdMenuUser>
                        <img src={User} alt="User" />
                        <div className="dd-menu-user">
                            <ul>
                                <li>
                                    { auth.uid && <span onClick={handleLogout}>Logout</span>}
                                </li>
                            </ul>
                        </div>
                    </DdMenuUser> :
                    <DropdownMenu>
                        <FontAwesomeIcon icon={faEllipsisH} title={"More"} size={"2x"}></FontAwesomeIcon>

                        <div className="dd-menu">
                            <ul>
                                <li>
                                    <Link to={"/sign-in"}>sign in</Link>
                                </li>
                                <li>
                                    <Link to={"sign-up"}>create an account</Link>
                                </li>
                            </ul>
                        </div>

                    </DropdownMenu>
                }*/}
            </StyledNav>
        </>
    )
}

const StyledNav = styled.div`
    position: fixed;
    top: ${props => props.visible ? '0' : '-6rem'};
    left: 0;
    width: 100%;
    height: 5rem;
    //margin: 0 auto;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    z-index: 15;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem;
    transition: all 0.5s;
    background-color: #d7ccc8;
`

const DropdownMenu = styled.div`
  position: relative;
  &:hover {
    .dd-menu {
        display: block;
      }
    }
  
  
  svg {
    display: inline-block;
  }
  
  .dd-menu {
    display: none;
    position: absolute;
    background-color: olivedrab;
    right: 0;

    ul {
      list-style: none;
    }

    li {
      font-size: 1rem;
    }

    a {
      display: block;
      padding: 0.5rem;
      white-space: nowrap;
    }

    li:hover {
      background-color: palegreen;
    }
  }
`

const DdMenuUser = styled.div`
  &:hover {
    .dd-menu-user {
      display: block;
    }
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  img {
    display: inline-block;
    max-height: 75%;
    max-width: 75%;
    object-fit: contain;
    position: relative;
  }
  
  .dd-menu-user {
    display: none;
    position: absolute;
    top: 75%;
    background-color: olivedrab;
  }
  
  ul {
    list-style: none;
  }

  li {
    font-size: 1rem;
  }

  a {
    display: inline-block;
    padding: 0.5rem;
  }

  li:hover {
    background-color: palegreen;
  }
`

const Logo = styled.div`
  //display: flex;

  h3 {
    margin: 1.5rem 0;
    padding: 0;
    width: 12rem;
  }
`

export default Nav