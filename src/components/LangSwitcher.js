import React, { useContext } from "react";
import styled from "styled-components";
import { AppLangContext } from "../utils/AppLangProvider";

const LangSwitcher = () => {
    const { userLang, toggleLang } = useContext(AppLangContext)
    const handleLangChange = (e) => {
        toggleLang()
    }

    return (
        <Wrapper>
            <p onClick={handleLangChange}>mode: [{userLang === "en" ? 'ru' : 'en'}]</p>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
`

export default LangSwitcher