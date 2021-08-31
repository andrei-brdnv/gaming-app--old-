import React from "react";
import Home from "./pages/home";
import GlobalStyles from "./components/GlobalStyles";
import { Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import AsideMenu from "./components/AsideMenu";
import styled from "styled-components";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
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
                    <Nav />
                    <ContentWrapper>
                        <AsideMenu />
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
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  /*position: fixed;
  top: 0;
  left: 0;*/

  background: linear-gradient(-45deg, rgba(238, 119, 82, 0.5), rgba(231, 60, 126, 0.5), rgba(35, 166, 213, 0.5), rgba(35, 213, 171, 0.5));
  background-size: 400% 400%;
  animation: Gradient 25s ease infinite;
  overflow: hidden;
`

export default App;
