import React, { useEffect } from "react";
import navHighlighter from "../utils/navHighlighter";
// Styles
import styled from "styled-components";
// Components
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import SideLinks from "./SideLinks";

const SideMenu = () => {
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
        <Container>
            <SideNav>
                <Home onClick={scrollToTop}>Home</Home>
                <SideLinks/>
                <ThemeSwitcher/>
                <LangSwitcher/>
            </SideNav>
        </Container>
    )
}

const Container = styled.div`
  padding: 0 2rem;
`

const SideNav = styled.nav`
  position: sticky;
  top: 0;
  width: 10rem;
  padding: 7rem 0;
`

const Home = styled.h2`
  font-weight: bold;
  margin-bottom: 3rem;
  cursor: pointer;
  color: ${props => props.theme.colors.font};
`

export default SideMenu