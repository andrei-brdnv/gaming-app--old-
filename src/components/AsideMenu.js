import React, { useEffect } from "react";
import navHighlighter from "../utils/navHighlighter";

import styled from "styled-components";

import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import AsideLinks from "./AsideLinks";

const AsideMenu = () => {
    useEffect(() => {
        window.addEventListener('scroll', navHighlighter);
        return () => window.removeEventListener('scroll', navHighlighter);
    }, [navHighlighter])

    const scrollToTop = () => {
        window.scrollTo({
            top: -112
        })
    }

    return (
        <Wrapper>
            <AsideNav>
                <Home onClick={scrollToTop}>Home</Home>
                <AsideLinks/>
                <ThemeSwitcher/>
                <LangSwitcher/>
            </AsideNav>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 0 2rem;
`

const AsideNav = styled.aside`
  position: sticky;
  top: 0;
  width: 10rem;
  padding: 7rem 0;
`

const Home = styled.h2`
  font-weight: bold;
  margin-bottom: 3rem;
  cursor: pointer;
`

export default AsideMenu