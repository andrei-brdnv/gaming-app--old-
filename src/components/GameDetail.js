import React, {useMemo} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import getStarsRating from "../utils/getStarsRating";
import { smallImage } from "../utils/mediaResize";
import { useHistory } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import getPlatformLogo from "../utils/getPlatformLogo";
import moment from "moment";
import { Link } from "react-router-dom";

import {Platforms, Icon} from "./Game";
import {logger} from "redux-logger/src";
import metacriticBorder from "../utils/metacriticBorder";

const GameDetail = () => {
    const { game, screenshot, fetchingDetail, movie } = useSelector((store => store.detail))
    console.log(movie)
    const history = useHistory()

    const exitDetailHandler = (e) => {
        const element = e.target
        if (element.classList.contains('shadow')) {
            history.push('/')
        }
    }

    const showMetacriticBorder = useMemo(() => {
        return metacriticBorder(game.metacritic)
    }, [game.metacritic])

    const options = {
        settings: {
            lightboxTransitionSpeed: .1,
            slideTransitionSpeed: .1,
        },

        buttons: {
            iconPadding: '1rem',
            size: '4rem',
            showThumbnailsButton: false,
            showAutoplayButton: false,
            showDownloadButton: false,
        },

        caption: {
            showCaption: false,
        },
    }

    return (
        <>
            {!fetchingDetail && (
                <CardShadow className='shadow' onClick={exitDetailHandler}>
                    {console.log('render GameDetail')}
                    <Detail>
                        <div>
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
                            <Stats>
                                <Rating>
                                    <h3>{game.name}</h3>
                                    <p>Rating: {game.rating}</p>
                                    {getStarsRating(game.rating)}
                                </Rating>
                            </Stats>
                            <Media>
                                <img src={smallImage(game.background_image, 1280)} alt='image'/>
                            </Media>
                            <Description>
                                <p>{game.description_raw}</p>
                            </Description>
                            <GameMetaContainer>
                                {game.platforms ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Platforms
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            {game.platforms.map((data, i) => (

                                                <Link key={data.platform.id}>
                                                    {data.platform.name}
                                                    {i !== game.platforms.length - 1 ? ', ' : ''}
                                                </Link>
                                            ))}
                                        </GameMetaText>
                                    </GameMeta>
                                ): null}

                                {game.genres ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Genre
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="genres">
                                                {game.genres.map((genre, i) => (
                                                    <Link key={genre.id}>
                                                        {genre.name}
                                                        {i !== game.genres.length - 1 ? ', ' : ''}
                                                    </Link>
                                                ))}
                                            </div>
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

                                {game.developers ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Developers
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="developers">
                                                {game.developers.map((developer, i) => (
                                                    <Link key={developer.id}>
                                                        {developer.name}
                                                        {i !== game.developers.length - 1 ? ', ' : ''}
                                                    </Link>
                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.publishers ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Publishers
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="publishers">
                                                {game.publishers.map((publisher, i) => (
                                                    <Link key={publisher.id}>
                                                        {publisher.name}
                                                        {i !== game.publishers.length - 1 ? ', ' : ''}
                                                    </Link>
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

                                {game.tags ? (
                                    <GameMeta>
                                        <GameMetaTitle>
                                            Tags
                                        </GameMetaTitle>
                                        <GameMetaText>
                                            <div className="tags">
                                                {game.tags.map((tag, i) => (
                                                    <Link key={tag.id}>
                                                        {tag.name}
                                                        {i !== game.tags.length - 1 ? ', ' : ''}
                                                    </Link>
                                                ))}
                                            </div>
                                        </GameMetaText>
                                    </GameMeta>
                                ) : null}

                                {game.website ? (
                                    <GameMeta>
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
                            </GameMetaContainer>


                        </div>
                        <ContentRight>
                            <SRLWrapper options={options}>
                                <Gallery>
                                    {screenshot.results.map(screen => (
                                        <a href={screen.image}>
                                            <img
                                                src={smallImage(screen.image, 1280)}
                                                key={screen.id}
                                                alt={game.name}
                                                id={screen.id}
                                            />
                                        </a>
                                    ))}
                                </Gallery>
                            </SRLWrapper>
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
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  display: flex;
  justify-content: space-between;

  img {
    width: 100%;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContentRight = styled.div`
  margin-left: 3rem;
`

const Rating = styled.div`
  h3 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }
`

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem 1rem 0;
  }
  
  span {
    color: #424242;
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
`

const GameMeta = styled.div`
  width: 50%;
`

const GameMetaTitle = styled.div`
  margin-bottom: 1rem;
`

const GameMetaText = styled.div`
  a {
    text-decoration: underline;
    cursor: pointer;
    word-wrap: break-word;
  }

  .metacritic {
    display: inline;
    font-weight: bold;
  }

  .metacritic.green {
    border: 2px solid green;
    padding: 0.1rem 0.2rem;
  }

  .metacritic.yellow {
    border: 2px solid orange;
    padding: 0.1rem 0.2rem;
  }

  .metacritic.red {
    border: 2px solid red;
    padding: 0.1rem 0.2rem;
  }

  .metacritic.not-active {
    border: none;
  }
  
`

/*const Platforms = styled.div`
  span {
    display: block;
    margin-bottom: 0.25rem;
  }  
`*/

const Media = styled.div`
  margin-top: 1rem;

  img {
    width: 100%;
  }
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  align-content: center;
  grid-gap: 10px;

  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
  }
`

const Description = styled.div`
  margin: 2.5rem 0;
`

export default GameDetail