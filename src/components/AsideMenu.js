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

    const sections = document.querySelectorAll("section[id]")
    console.log(sections)

    const navHighlighter = (e) => {
        // Get current scroll position
        let scrollY = window.pageYOffset;

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

    const handleScroll = (e) => {
        const scrollDistance = window.pageYOffset
        //console.log(scrollDistance)
    }

    useEffect(() => {
        window.addEventListener('scroll', navHighlighter);
        return () => window.removeEventListener('scroll', navHighlighter);
    }, [navHighlighter, handleClick, searched])

    return (
        <Wrapper>
            <Aside>
                <AsideNav>
                    <h2 onClick={scrollToTop}>Home</h2>
                    <Links className="links">
                        {searched.length ? (
                            <div className="searched">

                                    <span onClick={scrollToTop}>searched</span>
                                    <span onClick={clearSearched}>
                                        <FontAwesomeIcon icon={faTimes} title={'Delete'} />
                                    </span>

                            </div>
                        ) : null}
                        <a href="#upcoming" onClick={handleClick}>upcoming</a>
                        <a href="#popular" onClick={handleClick}>popular</a>
                        <a href="#new-games" onClick={handleClick}>new games</a>
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
  
  a {
    width: 100%;
    padding: 0.5rem;
    cursor: pointer;
    
    color: black;
    
  }
  
  .searched {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    background-color: #0d59f2;
    padding: 0.5rem;
    width: 100%;
    margin-bottom: 1rem;

    span:nth-child(1) {
      cursor: pointer;
    }
    
    span:nth-child(1):hover {
      text-decoration: underline;
    }
    
    span:nth-child(2) {
      cursor: pointer;
      margin-left: 1rem;
    }
    
    span:nth-child(2):hover {
      transform: scale(1.2);
    }
  }
  
  & > .active {
    transition: all .05s ease;
    background-color: #cfd8dc;
  }
`

export default AsideMenu