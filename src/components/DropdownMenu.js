import React, {useEffect, useRef, useState} from "react";
import { ReactComponent as ArrowIcon } from "../images/right-arrow.svg";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";

const DropdownMenu = () => {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <MenuItem href="#" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
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
                onEnter={calcHeight}>
                <Menu>
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<ArrowIcon />}
                        rightIcon={<ArrowIcon />}
                        goToMenu="settings"
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        leftIcon="🦧"
                        rightIcon={<ArrowIcon />}
                        goToMenu="animals">
                        Animals
                    </DropdownItem>

                </Menu>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <Menu>
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>My Tutorial</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="&#x1F60a;">HTML</DropdownItem>
                    <DropdownItem leftIcon="&#x1F60a;">CSS</DropdownItem>
                    <DropdownItem leftIcon="&#x1F60a;">JavaScript</DropdownItem>
                    <DropdownItem leftIcon="&#x1F60a;">Awesome!</DropdownItem>
                </Menu>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === 'animals'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <Menu>
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
                        <h2>Animals</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
                    <DropdownItem leftIcon="🐸">Frog</DropdownItem>
                    <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
                    <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
                </Menu>
            </CSSTransition>

        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 4.75rem;
  width: 18.75rem;
  transform: translateX(-45%);
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  transition: ${props => props.height} 500ms ease;
  
  .menu-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  .menu-primary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  .menu-primary-exit {
    position: absolute;
  }
  .menu-primary-exit-active {
    transform: translateX(-110%);
    transition: all 500ms ease;
  }

  .menu-secondary-enter {
    transform: translateX(110%);
  }
  .menu-secondary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  .menu-secondary-exit {

  }
  .menu-secondary-exit-active {
    transform: translateX(110%);
    transition: all 500ms ease;
  }
`

const Menu = styled.div`
  width: 100%;
`

const MenuItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: background 500ms;
  padding: 0.5rem;
  
  color: #dadce1;
  text-decoration: none;
  
  &:hover {
    background-color: #525357;
  }
  
  .icon-right {
    margin-left: auto;
  }
  
  .icon-button {
    margin-right: 0.5rem;
  }

  .icon-button:hover {
    filter: none;
  }
`

export default DropdownMenu