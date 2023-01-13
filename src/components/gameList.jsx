import React from 'react';
import GameCard from "./gameCard";
import {useSelector} from "react-redux";
import Pagination from "./pgination";

const GameList = () => {
    const games = useSelector(state => state.games.gamesPaginated);
    return (
        <>
            <div className="flex flex-wrap">
                {games.map((game) => (
                    <GameCard key={game.title} {...game}/>
                ))}
            </div>
            <Pagination/>
        </>

    );
}

export default GameList;
