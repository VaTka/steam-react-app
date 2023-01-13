import './App.css';
import GameList from "./components/gameList";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchGames} from "./store/steamSlice";
import {Route, Routes} from "react-router-dom"
import {Layout} from "./components/Layout";
import LikedGameList from "./components/likedGameList";
import GamePage from "./components/gamePage";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchGames())
    }, [dispatch])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<GameList/>}/>
                    <Route path="liked" element={<LikedGameList/>}/>
                    <Route path=":id" element={<GamePage />}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
