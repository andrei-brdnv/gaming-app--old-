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
import { CLEAR_SEARCHED, CLEAR_GAMESERIES } from "../utils/constants";

import { motion } from "framer-motion"

const AsideMenu = () => {
    const { searched, gameSeries } = useSelector((store => store.games))
    const dispatch = useDispatch()

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }

    const clearGameSeries = () => {
        dispatch({type: CLEAR_GAMESERIES})
    }

    const navHighlighter = (e) => {
        // Get current scroll position
        let scrollY = window.pageYOffset;
        const sections = document.querySelectorAll("section[id]")

        // Now we loop through sections to get height, top and ID values for each
        sections.forEach(current => {

            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 112;
            const sectionId = current.getAttribute("id");

            /*
            - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
            - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as a selector
            */
            if (
                scrollY >= sectionTop &&
                scrollY <= sectionTop + sectionHeight
            ){
                document.querySelector(".links a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector(".links a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }

    const handleClick = (e) => {
        e.preventDefault()
        const target = e.target.getAttribute("href")
        const location = document.querySelector(target).offsetTop
        window.scrollTo({
            left: 0,
            top: location - 112,
        })


    }

    const scrollToTop = () => {
        window.scrollTo({
            top: -112
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', navHighlighter);
        return () => window.removeEventListener('scroll', navHighlighter);
    }, [navHighlighter])

    return (
        <Wrapper>
            {console.log('render AsideMenu')}
            <Aside>
                <AsideNav>
                    <h2 onClick={scrollToTop}>Home</h2>
                    <Links className="links">
                        {gameSeries.length ? (
                            <motion.div className="game-series" animate={{ scale: 1 }} initial={{ scale: 0.5 }} transition={{ type: 'spring' }}>
                                <div>
                                    <a href="#game-series" onClick={handleClick}>game series</a>
                                    <span onClick={clearGameSeries}>
                                        <FontAwesomeIcon icon={faTimes} title={'Delete'} />
                                    </span>

                                </div>



                            </motion.div>
                        ) : null}
                        {searched.length ? (
                            <motion.div className="searched" animate={{ scale: 1 }} initial={{ scale: 0.5 }} transition={{ type: 'spring' }}>
                                <div>
                                    <a href="#searched" onClick={handleClick}>searched</a>
                                    <span onClick={clearSearched}>
                                        <FontAwesomeIcon icon={faTimes} title={'Delete'} />
                                    </span>
                                </div>

                            </motion.div>
                        ) : null}
                        <div className="menu">
                            <a href="#upcoming" onClick={handleClick}>upcoming</a>
                            <a href="#popular" onClick={handleClick}>popular</a>
                            <a href="#new-games" onClick={handleClick}>new games</a>
                        </div>

                        {/*{searched.length ? (
                            <div className="searched">
                                <Link to='searched' className="searched" smooth={true} duration={400} isDynamic={true} offset={-112}>
                                    <span>searched</span>
                                    <span onClick={clearSearched}>
                                        <FontAwesomeIcon icon={faTimes} title={'Delete'} />
                                    </span>
                                </Link>

                            </div>

                        ) : null}
                        <Link activeClass="active" to='upcoming' spy={true} smooth={true} duration={400} offset={-112}>upcoming</Link>
                        <Link activeClass="active" to='popular' spy={true} smooth={true} duration={400} offset={-112}>popular</Link>
                        <Link activeClass="active" to='new-games' spy={true} smooth={true} duration={400} offset={-112}>new games</Link>*/}
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
    cursor: pointer;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
  position: relative;
  
  .menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 35px;
    width: 100%;
    
    & > .active {
      transition: all .05s ease;
      background-color: #cfd8dc;
    }
    
  }
  
  a {
    width: 100%;
    padding: 0.5rem;
    cursor: pointer;
    
    color: black;
    
  }
  
  .game-series {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    width: 100%;
    position: absolute;
    
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: black;
      width: 100%;
      position: relative;

      & > .active {
        transition: all .05s ease;
        background-color: #cfd8dc;
      }

      span {
        cursor: pointer;
        position: absolute;
        right: 0.5rem;

      }

      span:hover {
        transform: scale(1.25);
      }
    }
  }

  .searched {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    width: 100%;
    position: absolute;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: black;
      width: 100%;
      position: relative;

      & > .active {
        transition: all .05s ease;
        background-color: #cfd8dc;
      }

      span {
        cursor: pointer;
        position: absolute;
        right: 0.5rem;

      }

      span:hover {
        transform: scale(1.25);
      }
    }
  }
  
  
`

export default AsideMenu