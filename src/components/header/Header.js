import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { debounce } from "../../utils/debounce";
import { changeInput, fetchSearched, signOut } from "../../actions";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faDove } from "@fortawesome/free-solid-svg-icons";
import User from "../../images/profile-user.png";
import HeaderSearch from "./HeaderSearch";
import HeaderNav from "./HeaderNav";
import { closeItem } from "../../actions";

const Header = () => {
    const dispatch = useDispatch()
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const { open } = useSelector(store => store.ui)

    const handleScroll = debounce(() => {
        // find current scroll position
        const currentScrollPos = window.pageYOffset;
        // set state based on location info
        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30));
        // set state to new scroll position
        setPrevScrollPos(currentScrollPos);
        {open && dispatch(closeItem())}

    }, 150);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <>
            <Container visible={visible}>
                <Logo><FontAwesomeIcon icon={faDove} /></Logo>
                <HeaderSearch />
                <HeaderNav />
            </Container>
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: ${props => props.visible ? '0' : '-6rem'};
    left: 0;
    width: 100%;
    height: 5rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    z-index: 15;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem;
    transition: all 0.5s;
    background-color: #BEBEBE;
`

const Logo = styled.div`
  font-size: 2.5rem;
  margin-right: 9.5rem;
`

export default Header