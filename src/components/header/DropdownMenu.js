import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import { ReactComponent as ArrowIcon } from "../../images/right-arrow.svg";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faArrowLeft, faChevronRight, faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../ThemeSwitcher";
import LangSwitcher from "../LangSwitcher";
import {AppThemeContext} from "../../context/AppThemeProvider";
import {AppLangContext} from "../../context/AppLangProvider";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../actions";
import {Link, useHistory, useLocation} from "react-router-dom";
import { closeItem } from "../../actions";
import useClickOutside from "../../utils/clickOutsideFunc";

const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(0);
    const pathname = useLocation()
    const dispatch = useDispatch()
    const { auth } = useSelector(store => store.firebase)
    const dropdownRef = useRef(null);
    const { toggleTheme, themeMode } = useContext(AppThemeContext);
    const { userLang, toggleLang } = useContext(AppLangContext)

    const history = useHistory()

    /*useClickOutside(dropdownRef, () => {
        dispatch(closeItem())
    })*/

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
        console.log("DDREF", dropdownRef)
    }, [auth.uid])

    /*useEffect(() => {
        dispatch(closeItem())
    }, [pathname])*/

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
        dispatch(closeItem())
    }

    const DropdownItem = (props) => {
        return (
            <MenuItem
                onClick={() => {
                    props.goToMenu && setActiveMenu(props.goToMenu);
                    props.mode === "theme" && props.handleThemeChange();
                    props.mode === "lang" && props.handleLangChange();
                    props.mode === "logout" && props.handleLogout();
                }}
            >
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
                            <DropdownItem mode="logout" handleLogout={handleLogout}>
                                Logout
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
                        <DropdownItem mode={"theme"} handleThemeChange={handleThemeChange} leftIcon={themeMode === 'lightTheme' ? `\u{1F31E}` : `\u{1F311}`}>
                            {themeMode === 'lightTheme' ? 'Light theme' : 'Dark theme'}
                        </DropdownItem>
                        <DropdownItem mode={"lang"} handleLangChange={handleLangChange} leftIcon={userLang === 'ru' ? `ru` : `en`}>
                            {userLang === 'ru' ? 'Русский' : 'English'}
                        </DropdownItem>
                    </Menu>
                </CSSTransition>
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 4.75rem;
  width: 15rem;
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

const Menu = styled.div`
  width: 100%;
  color: #303030;
  text-decoration: none;
`

const MenuItem = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  transition: background .5s;
  padding: 0.5rem;
  width: 100%;

  color: #303030;
  text-decoration: none;
  cursor: pointer;
  
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