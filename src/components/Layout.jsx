import {Outlet} from "react-router-dom";
import Header from "./header";
import {useSelector} from "react-redux";

const Layout = () => {
    const {status, error} = useSelector(state => state.games)
    return (
        <div className='bg-[#171A21] w-full h-full'>
            <Header/>
            {status === "Loading" && <h2 className="text-white">Loading...</h2>}
            {error && <h2 className="text-white">Error: {error}</h2>}
            <Outlet />
        </div>
    )
}

export {Layout}
