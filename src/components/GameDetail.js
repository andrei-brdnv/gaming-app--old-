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
// Styles
import metacriticBorder from "../utils/metacriticBorderStyle";
import ReactHtmlParser from "react-html-parser";

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
                        <ContentLeft>
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

                                {game.platforms ? (
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

                                {game.genres ? (
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

                                {game.developers ? (
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

                                {game.publishers ? (
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

                                {game.tags ? (
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
                            </GameMetaContainer>


                        </ContentLeft>
                        <ContentRight>
                            <SRLWrapper options={options}>
                                <Gallery>
                                    {screenshot.results.map(screen => (
                                        <a href={screen.image}>
                                            <div>
                                                <img
                                                    src={smallImage(screen.image, 1280)}
                                                    key={screen.id}
                                                    alt={game.name}
                                                    id={screen.id}
                                                />
                                            </div>
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
  
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`

const ContentLeft = styled.div`
    
`

const ContentRight = styled.div`
  width: 30rem;
  flex: 0 0 auto;
  margin-left: 3rem;
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
  
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 2rem;
    margin-bottom: 1rem;
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
  margin-bottom: 2rem;
`

const GameMeta = styled.div`
  width: ${props => props.width || '50%'};
  
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
  
  &:nth-child(odd) {
    padding-right: 1rem;
  }
`

const GameMetaTitle = styled.div`
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #333;
`

const GameMetaText = styled.div`
  line-height: 1.5;
  color: #333;
  
  a {
    text-decoration: underline;
    cursor: pointer;
    word-wrap: break-word;
  }

  .metacritic {
    display: inline;
    font-weight: bold;
    opacity: 0.75;
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
  
  svg {
    opacity: 0.75;
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
  /*display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  align-content: center;
  grid-gap: 10px;*/
  
  display: flex;
  flex-wrap: wrap;
  
  a {
    display: block;
    width: 50%;
    padding-bottom: 0.5rem;
  }
  
  div {
    width: 14.5rem;
    height: 10rem;
  }
  
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
`

const Description = styled.div`
  margin: 2rem 0;
  
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

export default GameDetail