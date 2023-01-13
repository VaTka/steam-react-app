import {useDispatch, useSelector} from "react-redux";
import {fetchGamesDetails} from "../store/steamSlice";
import {useEffect} from "react";
import { useParams} from "react-router-dom";

const GamePage = () => {
    const gameId = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGamesDetails(gameId.id))
    }, [dispatch])
    const gameInfo = useSelector(state => state.games.gameInfo);

    return (
        <div className="flex flex-col items-center space-y-4 text-white">
            <h2 className=" text-3xl font-bold">{gameInfo.title}</h2>
            <img src={gameInfo.imgUrl} className="w-full" alt={gameInfo.title}/>
            <div className="flex flex-col space-y-4 w-8/12 ">
                <div className="text-3xl font-bold">{gameInfo.price}</div>
                <div>{gameInfo.description}</div>
                <div className="text-3xl font-thin">Developer: {gameInfo.developer?.name}</div>
                <div className="text-3xl font-thin">Publisher: {gameInfo.publisher?.name}</div>

                <div>{gameInfo.released}</div>
                <div className="text-3xl">Tags:</div>
                <div className="flex flex-wrap space-x-4 pb-8">
                    {gameInfo.tags?.map(tag => (<div key={tag.name}>{tag.name} </div>))}
                </div>
            </div>
        </div>
    )
}

export default GamePage
