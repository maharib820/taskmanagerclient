import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {

    const { user, loading, logOut } = useContext(AuthContext);

    return (
        <div className="navbar shadow bg-base-100 lg:px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 mx-3 rounded-box w-44 bgw bg-white">
                        <li><Link to={"/"}>Home</Link></li>
                        {
                            loading ? ""
                                :
                                user ? <li><Link to={"/taskmanager"}>Task Manager</Link></li>
                                    : ""
                        }
                        <li><Link to={"/contact"}>Contact</Link></li>
                        <li><Link to={"/about"}>About</Link></li>
                    </ul>
                </div>
                <h2 className="text-xl">Task Manager</h2>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to={"/"}>Home</Link></li>
                    {
                        loading ? ""
                            :
                            user ? <li><Link to={"/taskmanager"}>Task Manager</Link></li>
                                : ""
                    }
                    <li><Link to={"/contact"}>Contact</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {
                    loading ? <span className="loading loading-ring loading-lg"></span>
                        :
                        user ?
                            <div className="flex items-center gap-3">
                                <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt="" />
                                <button onClick={() => logOut()}><IoIosLogOut className="text-2xl"></IoIosLogOut></button>
                            </div>
                            :
                            <Link to={"/login"}><button className="btn bg-green-500 text-white">Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;