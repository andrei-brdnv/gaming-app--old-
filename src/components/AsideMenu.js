import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-scroll";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import {loadGames} from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CLEAR_SEARCHED } from "../utils/constants";

const AsideMenu = () => {
    const { searched } = useSelector((store => store.games))
    const dispatch = useDispatch()

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }

    /*const handleClick = (e) => {
        e.preventDefault()
        const target = e.target.getAttribute('href')
        const location = document.querySelector(target).offsetTop
        console.log(location)
        window.scrollTo({
            left: 0,
            top: location - 112,
        })


    }

    const handleScroll = (e) => {
        const scrollDistance = window.pageYOffset
        //console.log(scrollDistance)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll])*/

    const handleSetActive = () => !searched.length


    return (
        <Wrapper>
            <Aside>
                <AsideNav>
                    <h2>Home</h2>
                    <Links>
                        {/*<a href="#upcoming" onClick={handleClick}>upcoming</a>
                        <a href={"#popular"} onClick={handleClick}>popular</a>
                        <a href={"#new-games"} onClick={handleClick}>new games</a>*/}
                        {searched.length ? (
                            <div className="searched">
                                <Link to='searched' className="searched" smooth={true} isDynamic={true} duration={400} offset={-112}>
                                    <span>searched</span>
                                    <span onClick={clearSearched}>
                                        <FontAwesomeIcon icon={faTimes} title={'Delete'} />
                                    </span>
                                </Link>

                            </div>

                        ) : null}
                        <Link activeClass="active" to='upcoming' spy={true} smooth={true} duration={400} offset={-112}>upcoming</Link>
                        <Link activeClass="active" to='popular' spy={true} smooth={true} duration={400} offset={-112}>popular</Link>
                        <Link activeClass="active" to='new-games' spy={true} smooth={true} duration={400} offset={-112}>new games</Link>
                    </Links>
                    <ThemeSwitcher />
                    <LangSwitcher />
                </AsideNav>
            </Aside>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 0 2rem;
`

const Aside = styled.aside`
  position: sticky;
  top: 0;
`

const AsideNav = styled.nav`
  width: 10rem;
  padding: 7rem 0;

  h2 {
    font-weight: bold;
    padding-bottom: 3rem;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
  a {
    display: block;
    margin-bottom: 0.25rem;
    padding-bottom: 0.25rem;
    cursor: pointer;
    
  }
  
  .searched {
    display: flex;
    align-items: center;
    justify-content: center;
    
    
    a {
      color: white;
      background-color: #0d59f2;
      padding: 0.5rem;
      margin-bottom: 1rem;
    }
    
    span:nth-child(1):hover {
      text-decoration: underline;
    }
    
    span:nth-child(2) {
      margin-left: 1rem;
    }
    
    span:nth-child(2):hover {
      transform: scale(1.2);
    }
  }
  
  
  
  & > .active {
    border-bottom: 1px solid black;
  }
`

export default AsideMenu