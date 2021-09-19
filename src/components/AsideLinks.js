import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_SEARCHED } from "../utils/constants";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const AsideLinks = () => {
    const { searched } = useSelector(store => store.games)
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        const target = e.target.getAttribute("href")
        const location = document.querySelector(target).offsetTop
        window.scrollTo({
            left: 0,
            top: location - 112,
        })
    }

    const clearSearched = () => {
        dispatch({type: CLEAR_SEARCHED})
    }

    return (
        <Links className="links">
            {searched.length ? (
                <Searched animate={{scale: 1}} initial={{scale: 0.5}} transition={{type: 'spring'}}>
                    <AsideLink href="#searched" onClick={handleClick}>searched</AsideLink>
                    <span onClick={clearSearched}>
                        <FontAwesomeIcon icon={faTimes} title={'Delete'}/>
                    </span>
                </Searched>
            ) : null}

            <AsideLink href="#upcoming" onClick={handleClick}>upcoming</AsideLink>
            <AsideLink href="#popular" onClick={handleClick}>popular</AsideLink>
            <AsideLink href="#new-games" onClick={handleClick}>new games</AsideLink>
        </Links>
    )
}

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 1rem;
  position: relative;
`

const Searched = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  width: 100%;

  span {
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
    
    &:hover {
      transform: scale(1.25);
    }
  }
`

const AsideLink = styled.a`
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  color: black;
  
  &.active {
    transition: all .05s ease;
    background-color: #cfd8dc;
  }
`

export default AsideLinks