import React from "react";
import Home from "./pages/home";
import GlobalStyles from "./components/GlobalStyles";
import { Route } from "react-router-dom";
import Nav from "./components/Nav";
import AsideMenu from "./components/AsideMenu";
import styled from "styled-components";

function App() {
    return (
        <div className="App">
            <Nav />
            <ContentWrapper>
                <AsideMenu />
                <Route path={['/game/:id', '/']}>
                    <Home />
                </Route>
            </ContentWrapper>
        </div>
    );
}

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`

export default App;
