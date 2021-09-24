import React, { useState } from "react";
import styled from "styled-components";

const NavItem = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <StyledNavItem>
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </StyledNavItem>
    );
}

const StyledNavItem = styled.li`
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon-button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #484a4d;
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

export default NavItem