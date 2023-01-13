import {useDispatch, useSelector} from "react-redux";
import {paginate} from "../store/steamSlice";

const Pagination = () => {
    const dispatch = useDispatch()
    const gamePerPage = useSelector(state => state.games.gamesPerPage);
    const gameNumbers = [];

    for (let i = 1; i <= Math.ceil(25 / gamePerPage); i++) {
        gameNumbers.push(i)
    }

    return (
        <div className="flex justify-center py-5">
            <div className="flex items-center space-x-2">
                <button className="px-4 py-3 text-gray-700 bg-[#5B5E63] rounded-full hover:bg-blue-400">
                    <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.26465 0.31398C8.46569 0.515082 8.57863 0.787799 8.57863 1.07216C8.57863 1.35652 8.46569 1.62923 8.26465 1.83033L2.58851 7.50647L8.26465 13.1826C8.45999 13.3849 8.56808 13.6558 8.56564 13.9369C8.5632 14.2181 8.45041 14.4871 8.25159 14.6859C8.05276 14.8847 7.78379 14.9975 7.50261 15C7.22144 15.0024 6.95055 14.8943 6.7483 14.699L0.31398 8.26465C0.112939 8.06355 0 7.79083 0 7.50647C0 7.22212 0.112939 6.9494 0.31398 6.7483L6.7483 0.31398C6.9494 0.112939 7.22211 0 7.50647 0C7.79083 0 8.06355 0.112939 8.26465 0.31398V0.31398Z"
                            fill="#0D0D0D"/>
                    </svg>

                </button>

                <div className="flex items-center space-x-2">
                    {gameNumbers.map(game => (
                        <div key={game}>
                            <button className="px-4 py-2 bg-[#5B5E63] rounded-full text-white font-bold hover:bg-blue-400" onClick={() => dispatch(paginate({game}))}>
                                {game}
                            </button>
                        </div>
                    ))}
                </div>

                {/*<button className="px-4 py-2 bg-[#5B5E63] rounded-full text-white font-bold hover:bg-blue-400">*/}
                {/*    1*/}
                {/*</button>*/}
                {/*<button className="px-4 py-2 bg-[#5B5E63] rounded-full text-white font-bold hover:bg-blue-400" onClick={() => {*/}
                {/*    dispatch(fetchGames({search: "Counter" ,page: 2}))*/}
                {/*}}>*/}
                {/*    2*/}
                {/*</button>*/}
                {/*<button className="px-4 py-2  bg-[#5B5E63] rounded-full  text-white font-bold hover:bg-blue-400">*/}
                {/*    3*/}
                {/*</button>*/}
                <button className="px-4 py-3 text-gray-700 bg-[#5B5E63] rounded-full hover:bg-blue-400">
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.705534 14.9012C0.4992 14.7055 0.379028 14.4359 0.371444 14.1516C0.363861 13.8674 0.469486 13.5918 0.665094 13.3854L6.18783 7.55986L0.362337 2.03712C0.161668 1.84014 0.0463918 1.57224 0.0413355 1.29109C0.0362791 1.00995 0.141847 0.738072 0.335303 0.534011C0.528759 0.329951 0.794623 0.210035 1.07563 0.200093C1.35664 0.190152 1.63032 0.29098 1.83771 0.48086L8.44134 6.74129C8.64767 6.93696 8.76784 7.20657 8.77542 7.49082C8.78301 7.77508 8.67738 8.05071 8.48178 8.25711L2.22135 14.8607C2.02568 15.0671 1.75607 15.1872 1.47181 15.1948C1.18756 15.2024 0.911925 15.0968 0.705534 14.9012Z"
                            fill="#0D0D0D"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Pagination
