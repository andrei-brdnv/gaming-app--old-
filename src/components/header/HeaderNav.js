import React, {useRef} from "react";
import { ReactComponent as ArrowIcon } from "../../images/right-arrow.svg";
import HeaderNavItem from "./HeaderNavItem";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";
import useClickOutside from "../../utils/clickOutsideFunc";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {closeItem, toggleOpen} from "../../actions";

const HeaderNav = () => {
    const dispatch = useDispatch()
    const dropdownButtonRef = useRef(null)

    useClickOutside(dropdownButtonRef, () => {
        dispatch(closeItem())
    })

    return (
        <List ref={dropdownButtonRef}>
            <HeaderNavItem icon={<FontAwesomeIcon icon={faCaretDown}/>}>
                <DropdownMenu/>
            </HeaderNavItem>
        </List>
    )
}

const List = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`

export default HeaderNav