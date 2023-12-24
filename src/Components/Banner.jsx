import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Banner = () => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    return (
        <div className="bg-blue-500 p-8 md:flex">
            <div className="flex justify-center items-center flex-1">
                <div>
                    <h1 className="text-4xl text-white font-bold mb-4 text-center lg:text-left">Manage Your Task</h1>
                    <div className="flex justify-center">
                        <button onClick={user ? () => navigate("/taskmanager") : () => navigate("/login")} className="bg-white text-blue-500 px-4 py-2 rounded-full">Explore</button>
                    </div>
                </div>
            </div>
            <div className="mt-4 md:mt-0 flex-1">
                <img
                    src="https://i.ibb.co/p6TVJRw/photo-1586281380117-5a60ae2050cc-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg"
                    alt="Banner Image"
                    className="w-full h-auto rounded-md"
                />
            </div>
        </div>
    );
};

export default Banner;