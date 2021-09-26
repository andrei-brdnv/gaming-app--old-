import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import { ReactComponent as ArrowIcon } from "../images/right-arrow.svg";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faArrowLeft, faChevronRight, faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import {AppThemeContext} from "../context/AppThemeProvider";
import {AppLangContext} from "../context/AppLangProvider";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../actions";
import {Link} from "react-router-dom";

const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(0);
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store.firebase)
    const dropdownRef = useRef(null);
    const { toggleTheme, themeMode } = useContext(AppThemeContext);
    const { userLang, toggleLang } = useContext(AppLangContext)


    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
        console.log("DDREF", dropdownRef)
    }, [])

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
        console.log("DDREF", dropdownRef)
    }

    const handleThemeChange = (e) => {
        toggleTheme();
    };

    const handleLangChange = (e) => {
        toggleLang()
    }

    const handleLogout = () => {
        dispatch(signOut())
    }

    const DropdownItem = (props) => {
        return (
            <MenuItem href="#" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                {props.goToMenu ? <span className="icon-button">{props.leftIcon}</span> : null}
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </MenuItem>
        );
    }

    return (
        <Container height={menuHeight} ref={dropdownRef}>
                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <Menu>
                        {auth.uid ?
                            <DropdownItem>
                                { auth.uid && <Theme onClick={handleLogout}>Logout</Theme>}
                            </DropdownItem> :
                            <>
                                <DropdownItem leftIcon={<FontAwesomeIcon icon={faSignInAlt} />}>
                                    <Link to={"/sign-in"}>Sign in</Link>
                                </DropdownItem>
                                <DropdownItem leftIcon={<FontAwesomeIcon icon={faUser} />}>
                                    <Link to={"sign-up"}>Create an account</Link>
                                </DropdownItem>
                            </>
                        }
                        <DropdownItem
                            leftIcon={<FontAwesomeIcon icon={faCog} />}
                            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                            goToMenu="settings"
                        >
                            Settings
                        </DropdownItem>
                    </Menu>
                </CSSTransition>

                <CSSTransition
                    in={activeMenu === 'settings'}
                    timeout={500}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={calcHeight}
                >
                    <Menu>
                        <DropdownItem goToMenu="main" leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}>
                            Settings
                        </DropdownItem>
                        <DropdownItem leftIcon={themeMode === 'lightTheme' ? `\u{1F31E}` : `\u{1F311}`}>
                            <Theme onClick={handleThemeChange}>
                                {themeMode === 'lightTheme' ? 'Light theme' : 'Dark theme'}
                            </Theme>
                        </DropdownItem>
                        <DropdownItem leftIcon={userLang === 'ru' ? `ru` : `en`}>
                            <Lang onClick={handleLangChange}>
                                {userLang === 'ru' ? 'Русский' : 'English'}
                            </Lang>
                        </DropdownItem>
                    </Menu>
                </CSSTransition>
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 4.75rem;
  width: 18.75rem;
  max-width: 100%;
  transform: translateX(-45%);
  background-color: #F8F8F8;
  border: 1px solid #BEBEBE;
  border-radius: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  height: ${props => props.height}px;
  transition: height 0.25s ease;
  font-size: 0.85rem;
  box-sizing: content-box;
  
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all 0.5s ease;
    padding-right: 1rem;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all 0.5s ease;
  }

  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all 0.5s ease;
  }
  .menu-secondary-exit {

  }
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all 0.5s ease;
  }
`

const Theme = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #303030;
`

const Lang = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

const Menu = styled.div`
  width: 100%;
  color: #303030;
  text-decoration: none;
`

const MenuItem = styled.a`
  height: 2.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  transition: background .5s;
  padding: 0.5rem;
  width: 100%;

  color: #303030;
  text-decoration: none;
  
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #303030;
    text-decoration: none;
  }
  
  &:hover {
    background-color: #BEBEBE;
  }
  
  .icon-right {
    margin-left: auto;
    flex-shrink: 0;
    color: #707070;
  }
  
  .icon-button {
    width: 2rem;
    height: 2rem;
    margin: 0 0.5rem 0 0;
    //margin-right: 0.5rem;
    flex-shrink: 0;
    font-size: 1.25rem;
    background-color: #707070;
  }

  .icon-button svg {
    width: 1rem;
    height: 1rem;
  }
  
  .icon-button:hover {
    filter: none;
  }
`

export default DropdownMenu