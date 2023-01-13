import React from 'react';
import GameCard from "./gameCard";
import {useSelector} from "react-redux";

const LikedGameList = () => {
    const games = useSelector(state => state.games.liked);
    return (
        <div className="flex flex-wrap">
            {games.map((game) => (
                <GameCard key={game.title} {...game}/>
            ))}
        </div>
    );
}

export default LikedGameList;
