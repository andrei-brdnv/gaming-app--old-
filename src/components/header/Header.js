import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeItem } from "../../actions";
import { debounce } from "../../utils/debounce";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";
// Components
import HeaderSearch from "./HeaderSearch";
import HeaderNav from "./HeaderNav";

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
        <Wrapper visible={visible}>
            <Container>
                <Logo><FontAwesomeIcon icon={faDove}/></Logo>
                <HeaderSearch/>
                <HeaderNav/>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.header`
  position: fixed;
  top: ${props => props.visible ? '0' : '-6rem'};
  width: 100%;
  background-color: ${props => props.theme.colors.header};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.35s linear;
  z-index: 15;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 5rem;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
`

const Logo = styled.div`
  font-size: 2.5rem;
  margin-right: 9.5rem;
`

export default Header