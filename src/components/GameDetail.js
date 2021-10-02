import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import getStarsRating from "../utils/getStarsRating";
import getPlatformLogo from "../utils/getPlatformLogo";
import moment from "moment";
import metacriticBorder from "../utils/metacriticBorderStyle";
import ReactHtmlParser from "react-html-parser";
// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// Components
import GameMetaTest from "./GameMetaTest";
import ImagesLightbox from "./ImagesLightbox";

const GameDetail = () => {
    const { game, screenshot, fetchingDetail, movie } = useSelector(store => store.detail)
    console.log(movie)
    const history = useHistory()

    const exitDetailHandler = (e) => {
        const element = e.target
        if (element.classList.contains('shadow')) {
            history.push('/')
        }
    }

    const closeDetail = (e) => {
        e.preventDefault()
        history.push('/')
    }



    return (
        <>
            {!fetchingDetail && (
                <CardShadow className='shadow' onClick={exitDetailHandler}>
                    <Detail>
                        <ContentLeft>
                            <CloseDetailsButton onClick={closeDetail}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                                <span>Go back to home page</span>
                            </CloseDetailsButton>
                            <Info>
                                <div>
                                    {moment(game.released).format('ll')}
                                </div>

                                <div>
                                    {game.platforms.map(data => (
                                        <span key={data.platform.id}>{getPlatformLogo(data.platform.name)}</span>
                                    ))}
                                </div>
                                {game.playtime ? (
                                    <div>
                                        Average playtime: {game.playtime} hours
                                    </div>
                                ) : null}
                            </Info>
                            <Name>
                                {game.name}
                            </Name>
                            {/*<Media>
                                <img src={smallImage(game.background_image, 1280)} alt='image'/>
                            </Media>*/}
                            <Description>
                                <p>{ReactHtmlParser(game.description)}</p>
                            </Description>
                            <GameMetaContainer>
                                <GameMetaTest name={"Rating"} data={game.rating} getStarsRating={getStarsRating} />
                                <GameMetaTest name={"Metascore"} data={game.metacritic} />
                                <GameMetaTest name={"Platforms"} array={game.platforms} />
                                <GameMetaTest name={"Genre"} array={game.genres} />
                                <GameMetaTest name={"Release Date"} data={game.released} />
                                <GameMetaTest name={"Developers"} array={game.developers} />
                                <GameMetaTest name={"Publishers"} array={game.publishers} />
                                <GameMetaTest name={"Age Rating"} data={game.esrb_rating} width={"100%"} />
                                <GameMetaTest name={"Tags"} array={game.tags} width={"100%"} />
                                <GameMetaTest name={"Website"} data={game.website} width={"100%"} />
                            </GameMetaContainer>
                        </ContentLeft>
                        <ContentRight>
                            <ImagesLightbox screenshots={screenshot.results} gameName={game.name} />
                        </ContentRight>
                    </Detail>
                </CardShadow>
            )}
        </>
    )
}

const CardShadow = styled.div`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar {
    background: white;
  }
`

const Detail = styled.div`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background-color: ${props => props.theme.colors.cardBg};
  position: absolute;
  left: 10%;
  color: black;
  display: flex;
  justify-content: space-between;

  img {
    width: 100%;
  }
  
  /*@media (max-width: 1200px) {
    flex-direction: column;
  }*/

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    padding: 2rem 1rem;
    left: 0;
    flex-direction: column;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`

const CloseDetailsButton = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  
  svg {
    margin-right: 0.5rem;
  }
`

const ContentLeft = styled.div`
  margin-right: 3rem;
`

const ContentRight = styled.div`
  width: 30rem;
  flex: 0 0 auto;

  @media screen and (max-width: 1280px) {
    width: max-content;
  }
  
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const Name = styled.h3`
  font-size: 3rem;
`

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.paragraph};
  
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 2rem;
    margin-bottom: 1rem;
  }
  
  span {
    
    font-size: 1.15rem;
    margin-right: 0.5rem;
  }
  
  span:last-child {
    margin-right: 0;
  }
`

const GameMetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`

const Description = styled.div`
  margin: 2rem 0;
  
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.paragraph};
  }
`

export default GameDetail