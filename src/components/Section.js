import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text } from "../context/AppLangProvider";
import { pageSize } from "../api";

import styled from "styled-components";
import { motion } from "framer-motion";

import GameCard from "./GameCard";
import Skeleton from "./Skeleton";
import LoaderCard from "./LoaderCard";

const Section = ({ gameArray, totalPages, currentPage, fetching, fetch, fetchStart, name }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (fetching) {
            dispatch(fetch(currentPage))
        }
    }, [fetching])

    return (
        <StyledSection id={name}>
            <h2><Text tid={`${name} games`}/></h2>

            <Games>
                {!gameArray.length && Array.from({length: pageSize}, (_, i) => i + 1).map((n) => <Skeleton key={n} />)}

                {gameArray && gameArray.map(game => (
                    <GameCard
                        key={game.id}
                        id={game.id}
                        name={game.name}
                        released={game.released}
                        image={game.background_image}
                        platforms={game.platforms}
                        genres={game.genres}
                        rating={game.rating}
                        metacritic={game.metacritic}
                    />
                ))}
                {gameArray.length < totalPages && totalPages !== currentPage &&
                fetching ? Array.from({length: pageSize}, (_, i) => i + 1).map((n) => <Skeleton key={n} />) : <LoaderCard onClick={() => dispatch(fetchStart())} />
                }
            </Games>
        </StyledSection>
    )
}

const StyledSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`

const Games = styled.div`
  min-height: 40vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 4rem;
`

export default Section