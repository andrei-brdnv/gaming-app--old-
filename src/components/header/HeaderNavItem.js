import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toggleOpen } from "../../actions";

const HeaderNavItem = (props) => {
    const dispatch = useDispatch()
    const { open } = useSelector(store => store.ui)

    const toggleDropdown = () => {
        dispatch(toggleOpen())
    }

    return (
        <NavItem>
            <span className="icon-button" onClick={toggleDropdown}>
                {props.icon}
            </span>

            {open && props.children}
        </NavItem>
    );
}

const NavItem = styled.li`
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #707070;
    //background-color: palevioletred;
    border-radius: 50%;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;

    color: #dadce1;
    text-decoration: none;
    cursor: pointer;
  }

  .icon-button:hover {
    filter: brightness(1.2);
  }

  .icon-button svg {
    fill: #dadce1;
    width: 1.5rem;
    height: 1.5rem;
  }
`

export default HeaderNavItem