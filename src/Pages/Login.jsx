import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2';
import app from "../Firebase/Firebase.config";
import { useContext } from "react";

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(() => {
                navigate(location?.state ? location.state : "/taskmanager")
            })
            .catch(error => {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                navigate(location?.state ? location.state : "/taskmanager")
            })
            .catch(error => {
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-3/5 xl:w-1/3 border rounded-2xl mt-14 p-5 lg:p-10">
                <div className="flex justify-center items-center gap-1">
                    <h1 className="text-xl lg:text-3xl text-[#161f2b] font-bold">Login</h1>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleLogin} className="w-full lg:w-10/12">
                        <input className="font-bold border border-[#29b2fe] w-full mt-8 mb-4 py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="email" name="email" placeholder="Email Address" />
                        <input className="font-bold border border-[#29b2fe] w-full py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="password" name="password" placeholder="Password" />
                        <input className="btn w-full rounded-none bg-[#29b2fe] mt-8 text-white" type="submit" value="Login" />
                    </form>
                </div>
                <p className="font-bold text-center my-5 w-10/12 mx-auto">Or</p>
                <div className="flex justify-center">
                    <button onClick={googleSignIn} className="w-full lg:w-10/12 btn border-2 border-[#29b2fe] rounded-none"><FcGoogle className="text-3xl"></FcGoogle>Continue with Google</button>
                </div>
                <hr className="h-2 w-10/12 mx-auto mt-20" />
                <div className="mt-4"><h3 className="text-center font-bold">Do not have an account? <Link to={"/register"}><span className="text-[#29b2fe]">Register</span></Link></h3></div>
            </div>
        </div>
    );
};

export default Login;