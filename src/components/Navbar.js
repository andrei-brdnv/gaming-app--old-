import React from "react";
import { ReactComponent as ArrowIcon } from "../images/right-arrow.svg";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";

const Navbar = (props) => {
    return (
            <StyledNavList>
                <NavItem icon="&#x1F60a;" />

                <NavItem icon={<ArrowIcon />}>
                    <DropdownMenu>

                    </DropdownMenu>
                </NavItem>
            </StyledNavList>
    )
}

const StyledNavbar = styled.nav`
  
`

const StyledNavList = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;

 /* list-style: none;
  margin: 0;
  padding: 0;*/
`

export default Navbar