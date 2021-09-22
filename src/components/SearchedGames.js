import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../context/AppLangProvider";
import { pageSize } from "../api";

import styled from "styled-components";
import { motion } from "framer-motion";
import { SectionContainer, Games } from "./Section";

import GameCard from "./GameCard";
import Skeleton from "./Skeleton";
import LoaderCard from "./LoaderCard";

const SearchedGames = ({ gameArray, totalPages, currentPage, fetching, fetch, fetchStart, name }) => {
    const dispatch = useDispatch()
    const { searchedName } = useSelector(store => store.games)

    useEffect(() => {
        if (fetching && currentPage > 1) {
            dispatch(fetch(searchedName, currentPage))
        }
    }, [fetching])

    return (
        <>
            {gameArray.length || searchedName ? (
                <SectionContainer id={name}>
                    <h2><Text tid={`${name} games`}/></h2>

                    <Games>
                        {!gameArray.length && Array.from({length: pageSize}, (_, i) => i + 1).map((n) => <Skeleton
                            key={n}/>)}

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
                        fetching ? Array.from({length: pageSize}, (_, i) => i + 1).map((n) => <Skeleton key={n}/>) :
                            <LoaderCard onClick={() => dispatch(fetchStart())} name={name}/>
                        }
                    </Games>
                </SectionContainer>
            ) : null}
        </>

    )
}

export default SearchedGames