import React from "react";
import { Switch, Route } from "react-router-dom";
// Styles
import styled from "styled-components";
// Components
import Header from "./components/header/Header";
import SideMenu from "./components/SideMenu";
import Home from "./pages/home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path={["/sign-in", "/sign-up", "/profile"]}>
                    <Container>
                        <Route path={"/sign-in"} component={SignIn} />
                        <Route path={"/sign-up"} component={SignUp} />
                    </Container>
                </Route>

                <div>
                    <Header />
                    <ContentWrapper>
                        <SideMenu />
                        <Route path={['/game/:id', '/']} exact component={Home} />
                    </ContentWrapper>
                </div>
            </Switch>
        </div>
    );
}

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 7rem 2rem;

  @media screen and (max-width: 768px) {
    padding: 7rem 1rem;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  background: linear-gradient(-45deg, rgba(238, 119, 82, 0.5), rgba(231, 60, 126, 0.5), rgba(35, 166, 213, 0.5), rgba(35, 213, 171, 0.5));
  background-size: 400% 400%;
  animation: Gradient 25s ease infinite;
  overflow: hidden;
`

export default App;
