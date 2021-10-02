import React, {useMemo, useState} from "react";
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
import GameMeta from "./GameMeta";
import ImagesLightbox from "./ImagesLightbox";

const GameDetail = () => {
    const [fullDesc, setFullDesc] = useState(false)
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

    const showFullDescription = () => {
        setFullDesc(!fullDesc)
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
                            <Description fullDesc={fullDesc}>
                                <div>
                                    {ReactHtmlParser(game.description)}
                                </div>
                                <span onClick={showFullDescription}>
                                    {fullDesc ? "Show less" : "Read more"}
                                </span>
                            </Description>
                            <GameMetaContainer>
<<<<<<< HEAD
                                <GameMeta name={"Rating"} data={game.rating} getStarsRating={getStarsRating} />
                                <GameMeta name={"Metascore"} data={game.metacritic} />
                                <GameMeta name={"Platforms"} array={game.platforms} />
                                <GameMeta name={"Genre"} array={game.genres} />
                                <GameMeta name={"Release Date"} data={game.released} />
                                <GameMeta name={"Developers"} array={game.developers} />
                                <GameMeta name={"Publishers"} array={game.publishers} />
                                <GameMeta name={"Age Rating"} data={game.esrb_rating} width={"100%"} />
                                <GameMeta name={"Tags"} array={game.tags} width={"100%"} />
                                <GameMeta name={"Website"} data={game.website} width={"100%"} />
=======
                                {game.rating ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Rating
                                        </GameMetaTitle>
                                        <GameMetaText title={`Rating: ${game.rating}`}>
                                            {getStarsRating(game.rating)}
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.metacritic ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Metascore
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className={`metacritic ${showMetacriticBorder}`} title={"Metascore"}>
                                                {game.metacritic}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.platforms.length ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Platforms
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            {game.platforms.map((data, i) => (
                                                <>
                                                    <Link key={data.platform.id}>
                                                        {data.platform.name}
                                                    </Link>
                                                    {i !== game.platforms.length - 1 ? ', ' : ''}
                                                </>

                                            ))}
                                        </GameMetaText>
                                    </GameMeta>
                                ): null}

                                {game.genres.length ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Genre
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="genres">
                                                {game.genres.map((genre, i) => (
                                                    <>
                                                        <Link key={genre.id}>
                                                            {genre.name}
                                                        </Link>
                                                        {i !== game.genres.length - 1 ? ', ' : ''}
                                                    </>

                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.released ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Release Date
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div>
                                                {moment(game.released).format('ll')}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.developers.length ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Developers
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="developers">
                                                {game.developers.map((developer, i) => (
                                                    <>
                                                        <Link key={developer.id}>
                                                            {developer.name}
                                                        </Link>
                                                        {i !== game.developers.length - 1 ? ', ' : ''}
                                                    </>

                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.publishers.length ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Publishers
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="publishers">
                                                {game.publishers.map((publisher, i) => (
                                                    <>
                                                        <Link key={publisher.id}>
                                                            {publisher.name}
                                                        </Link>
                                                        {i !== game.publishers.length - 1 ? ', ' : ''}
                                                    </>

                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.esrb_rating ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Age Rating
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="age-rating">
                                                {game.esrb_rating.name}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.tags.length ? (
                                    <GameMeta width="100%">
                                        <GameMetaTitle>
                                            Tags
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="tags">
                                                {game.tags.map((tag, i) => (
                                                    <>
                                                        <Link key={tag.id}>
                                                            {tag.name}
                                                        </Link>
                                                        {i !== game.tags.length - 1 ? ', ' : ''}
                                                    </>

                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.website ? (
                                    <GameMeta width="100%">
                                        <GameMetaTitle>
                                            Website
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="website">
                                                <a href={`${game.website}`} target={'_blank'} rel={'noreferrer noopener'}>
                                                    {game.website}
                                                </a>

                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}
>>>>>>> 634b6f14a3099b480dc340bf7aa79305c915df7c
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

  @media screen and (max-width: 768px) {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
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
  overscroll-behavior-y: none;

  img {
    width: 100%;
  }
  
  /*@media (max-width: 1200px) {
    flex-direction: column;
  }*/

  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
    padding: 2rem 1rem 8rem 1rem;
    left: 0;
    min-height: 100vh;
    flex-direction: column;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`

const CloseDetailsButton = styled.div`
  margin-bottom: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.inputFont};
  
  svg {
    margin-right: 0.5rem;
  }
`

const ContentLeft = styled.div`
  margin-right: 3rem;

  @media (max-width: 768px) {
    margin: 0;
  }
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
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
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
  
  div {
    margin-bottom: 0.5rem;
    overflow: hidden;
    height: ${props => props.fullDesc ? "auto" : "3rem"};
  }
  
  div p {
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.fullDesc ? "none" : "2"}; /* number of lines to show */
    -webkit-box-orient: vertical;
    font-size: 1rem;
    margin-bottom: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
<<<<<<< HEAD
=======
`

const GameMetaTitle = styled.div`
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.inputFont};
  opacity: 0.65;
`

const GameMetaText = styled.div`
  line-height: 1.5;
  color: ${props => props.theme.colors.font};
>>>>>>> 634b6f14a3099b480dc340bf7aa79305c915df7c
  
  div p:last-child {
    margin: 0;
  }
  
  div h3 {
    font-size: 1.15rem;
    color: ${props => props.theme.colors.paragraph};
  }
  
  //position: relative;

  /*div {
    //display: inline-block;
    font-size: 1rem;
    //line-height: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.paragraph};
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    //width: 10rem;
    //height: 4rem;
    
  }
  
  div p {
    text-overflow: ellipsis;
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    display: inline-block;
    padding-right: 20px;
  }
  
  div:after {
    content: 'Read more';
    position: absolute;
    right: 0;
    border: 1px solid black;
    //background-color: palevioletred;
  }*/

  /*p {
    //text-overflow: ellipsis;
    //width: 400px;
    height: 55px;
    overflow: hidden;
    //white-space: nowrap;
    position: relative;
    display: inline-block;
    padding-right: 120px;
  }*/
  
  /*p:after {
    content: 'Read more';
    right: 0;
    position: absolute;
  }*/
  
  span {
    display: inline-flex;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 0.1rem 0.2rem;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 0.25rem;
    align-items: center;
    //right: 0;
    //bottom: 0;
  }
  
`

export default GameDetail