import React from "react";
import Home from "./pages/home";
import GlobalStyles from "./components/GlobalStyles";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import AsideMenu from "./components/AsideMenu";
import styled from "styled-components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./pages/profile";

function App() {
    return (
        <div className="App">
            <Nav />
            <ContentWrapper>
                <AsideMenu />
                <Switch>
                    <Route path={['/game/:id', '/']} exact component={Home} />
                    <Route path={"/sign-in"} component={SignIn} />
                    <Route path={"/sign-up"} component={SignUp} />
                    <Route path={"/profile"} component={Profile} />
                </Switch>

            </ContentWrapper>
        </div>
    );
}

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
`

export default App;
