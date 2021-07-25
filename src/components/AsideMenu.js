import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";

const AsideMenu = () => {
    return (
        <Wrapper>
            <Aside>
                <AsideNav>
                    <h2>Home</h2>
                    <Links>
                        <div><Link to='upcoming' smooth={true} duration={400} isDynamic={true} offset={-200}>upcoming</Link></div>
                        <div><Link to='popular' smooth={true} duration={400} isDynamic={true} offset={-112}>popular</Link></div>
                        <div><Link to='new-games' smooth={true} duration={400} isDynamic={true} offset={-112}>new games</Link></div>
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

  div {
    padding-bottom: 1rem;
  }
`

export default AsideMenu