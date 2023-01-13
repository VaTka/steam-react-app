import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async function ( search = "Counter", {rejectWithValue}) {
        try {
            if (search) {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '24e6d3951cmsh25b5795a11cc739p185648jsn5568fee7a808',
                        'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
                    }
                };
                const response = await fetch(`https://steam2.p.rapidapi.com/search/${search}/page/1`, options)

                if (!response.ok) {
                    throw new Error('Error!');
                }

                const data = await response.json();
                return data
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const fetchGamesDetails = createAsyncThunk(
    'games/fetchGamesDetails',
    async function (gameId, {rejectWithValue}) {
        try {
            if (gameId) {
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '24e6d3951cmsh25b5795a11cc739p185648jsn5568fee7a808',
                        'X-RapidAPI-Host': 'steam2.p.rapidapi.com'
                    }
                };
                const response = await fetch(`https://steam2.p.rapidapi.com/appDetail/${gameId}`, options)

                if (!response.ok) {
                    throw new Error('Error!');
                }

                const data = await response.json();
                return data
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const gameSlice = createSlice({
    name: 'games',
    initialState: {
        games: [],
        gamesPaginated: [],
        gameInfo: [],
        liked: [],
        currentPage: 1,
        gamesPerPage: 5,
        status: null,
        error: null,
    },
    reducers: {
        toggleLike(state, action) {
            const toggledGame = state.gamesPaginated.find(game => game.appId === action.payload.appId);

            toggledGame.like = !toggledGame.like

            if (toggledGame.like === false) {
                state.liked = state.liked.filter(game => game.appId !== action.payload.appId)
            } else {
                state.liked.push(toggledGame)
            }
        },
        sortByLowerPrice(state) {
            state.gamesPaginated.sort((a, b) => (+a.price.replace(/^\D+/, '').replace(/€/, '').replace(/,/, '.')) > (+b.price.replace(/^\D+/, '').replace(/€/, '').replace(/,/, '.')) ? 1 : -1)
        },
        sortByBiggerPrice(state) {
            state.gamesPaginated.sort((a, b) => (+a.price.replace(/^\D+/, '').replace(/€/, '').replace(/,/, '.')) < (+b.price.replace(/^\D+/, '').replace(/€/, '').replace(/,/, '.')) ? 1 : -1)
        },
        sortByDate(state, action) {
            const Moment = require('moment')
            state.gamesPaginated.sort((a,b) => {
                return  +new Moment(a.released).month(2).format('YYYYMMDD') - +new Moment(b.released).month(2).format('YYYYMMDD')
            })
        },
        paginate(state, action) {
            state.currentPage = action.payload.game
            const indexOfLastGame = state.currentPage * state.gamesPerPage;
            const indexOfFirstGame = indexOfLastGame - state.gamesPerPage
            state.gamesPaginated = state.games.slice(indexOfFirstGame, indexOfLastGame)
        },

    },
    extraReducers: {
        [fetchGames.pending]: (state) => {
            state.status = "Loading"
            state.error = null
        },
        [fetchGames.fulfilled]: (state, action) => {
            state.status = "Resolved"
            // state.games = action.payload
            state.games = []

            state.games.push(...action.payload.map(data => ({
                appId: data.appId,
                title: data.title,
                imgUrl: data.imgUrl,
                price: data.price,
                released: data.released,
                like: false,
            })))

            state.currentPage = 1
            const indexOfLastGame = state.currentPage * state.gamesPerPage;
            const indexOfFirstGame = indexOfLastGame - state.gamesPerPage
            state.gamesPaginated = state.games.slice(indexOfFirstGame, indexOfLastGame)

        },
        [fetchGames.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload
        },

        [fetchGamesDetails.pending]: (state) => {
            state.status = "Loading"
            state.error = null
        },
        [fetchGamesDetails.fulfilled]: (state, action) => {
            state.status = "Resolved"
            state.gameInfo = action.payload
        },
        [fetchGamesDetails.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload
        },
    }
})

export const {toggleLike, sortByLowerPrice, sortByBiggerPrice, sortByDate, paginate} = gameSlice.actions

export default gameSlice.reducer
