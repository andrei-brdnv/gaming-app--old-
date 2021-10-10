import React, { useEffect, useState } from "react";
import { debounce } from "../../utils/debounce";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as SearchIcon } from "../../images/search.svg";
// Components
import HeaderSearch from "./HeaderSearch";
import MobileBurgerMenu from "./MobileBurgerMenu";

const MobileHeader = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const [openSearch, setOpenSearch] = useState(false)

    const handleScroll = debounce(() => {
        const currentScrollPos = window.pageYOffset;

        setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 30));
        setPrevScrollPos(currentScrollPos);
        setOpenSearch(false)
    }, 150);

    const scrollToTop = () => {
        window.scrollTo({
            top: -112
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos, visible, handleScroll]);

    return (
        <Wrapper visible={visible}>
            <MobileHeaderLayout>
                <UpperHeader>
                    <MobileLogo onClick={scrollToTop}>
                        <FontAwesomeIcon icon={faDove}/>
                    </MobileLogo>
                    <Right>
                        <SearchLogo onClick={() => setOpenSearch(!openSearch)}>
                            <SearchIcon />
                        </SearchLogo>
                        <MobileBurgerMenu />
                    </Right>
                </UpperHeader>
                <HeaderSearchWrapper openSearch={openSearch}>
                    <HeaderSearch />
                </HeaderSearchWrapper>
            </MobileHeaderLayout>
        </Wrapper>
    )
}

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${props => props.theme.colors.header};
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.35s linear;
  z-index: 20;
`

const MobileHeaderLayout = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  @media screen and (max-width: 768px) {
    display: flex;
  }
`

const UpperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.header};
  z-index: 30;
`

const MobileLogo = styled.div`
  font-size: 2.5rem;
`

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchLogo = styled.div`
  margin-right: 1.25rem;
  
  svg {
    width: 2rem;
    height: 2rem;
    fill: #707070;
    -webkit-tap-highlight-color: transparent;
  }
`

const HeaderSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${props => props.openSearch ? '4rem' : '1rem'};
  width: 100%;
  background-color: ${props => props.theme.colors.header};
  box-shadow: ${props => props.openSearch ? '0 5px 10px rgba(0, 0, 0, 0.25)' : '0'};
  padding: 0 1rem;
  height: 3rem;
  transition: top .25s ease;
`

export default MobileHeader