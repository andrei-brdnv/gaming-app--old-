import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import getPlatformLogo from "../utils/getPlatformLogo";
import getStarsRating from "../utils/getStarsRating";
import { smallImage } from "../utils/mediaResize";
import { useHistory } from "react-router-dom";
import { loadGames } from "../actions";

const GameDetail = () => {
    const { game, screenshot, isLoading } = useSelector((store => store.detail))

    const history = useHistory()

    const exitDetailHandler = (e) => {
        const element = e.target
        if (element.classList.contains('shadow')) {
            history.push('/')
        }
    }

    return (
        <>
            {!isLoading && (
                <CardShadow className='shadow' onClick={exitDetailHandler}>
                    <Detail>
                        <Stats>
                            <div className='rating'>
                                <h3>{game.name}</h3>
                                <p>Rating: {game.rating}</p>
                                {getStarsRating(game.rating)}
                            </div>
                            <Info>
                                <h3>Platforms</h3>
                                <Platforms>
                                    {game.platforms.map(data => (
                                        <Icon key={data.platform.id}>{getPlatformLogo(data.platform.name)}</Icon>
                                    ))}
                                </Platforms>
                            </Info>
                        </Stats>
                        <Media>
                            <img src={smallImage(game.background_image, 1280)} alt='image'/>
                        </Media>
                        <Description>
                            <p>{game.description_raw}</p>
                        </Description>
                        {/*<SRLWrapper options={options}>
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
                        </SRLWrapper>*/}
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

  img {
    width: 100%;
  }
`

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.div`
  text-align: center;

  h3 {
    margin-left: 1rem;
  }
`

const Platforms = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const Icon = styled.div`
  font-size: 2rem;
  margin-left: 1rem;
`

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
  margin: 5rem 0;
`

export default GameDetail