import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {

    const axiosPublic = useAxiosPublic();

    const imgbbKey = import.meta.env.VITE_IMGBB_P_KEY;
    const imgbbAPI = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const googleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(() => {
                navigate("/")
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

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const res = await axiosPublic.post(imgbbAPI, {image: form.photo.files[0]}, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        if (res.data.success) {
            const photo = res.data.data.display_url;
            createUser(email, password)
                .then(result => {
                    updateProfile(result.user, {
                        displayName: name,
                        photoURL: photo
                    })
                        .then(() => {
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "Your have registered successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                        .catch()
                    logOut();
                    navigate("/login");
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
    }

    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-3/5 xl:w-1/3 border rounded-2xl mt-14 p-5 lg:p-10">
                <div className="flex justify-center items-center gap-1 mb-8">
                    <h1 className="text-xl lg:text-3xl text-[#161f2b] font-bold">Register</h1>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={handleRegister} className="w-full lg:w-10/12">
                        <input className="font-bold border border-[#29b2fe] w-full mt-8 mb-4 py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="text" name="name" placeholder="Name" />
                        <input className="font-bold border border-[#29b2fe] w-full mb-4 py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="email" name="email" placeholder="Email Address" />
                        <input className="font-bold border border-[#29b2fe] w-full py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="password" name="password" placeholder="Password" />
                        <input className="font-bold border border-[#29b2fe] w-full mt-4 mb-4 py-2 px-3 focus:outline-none placeholder:text-slate-400 placeholder:font-bold" type="file" accept="image/*" name="photo" placeholder="Photo URL" />
                        <input className="btn w-full rounded-none bg-[#29b2fe] mt-8 text-white" type="submit" value="Register" />
                    </form>
                </div>
                <p className="font-bold text-center my-5 w-10/12 mx-auto">Or</p>
                <div className="flex justify-center">
                    <button onClick={googleSignIn} className="w-full lg:w-10/12 btn border-2 border-[#29b2fe] rounded-none"><FcGoogle className="text-3xl"></FcGoogle>Continue with Google</button>
                </div>
                <hr className="h-2 w-10/12 mx-auto mt-20" />
                <div className="mt-4"><h3 className="text-center font-bold">Already have an account? <Link to={"/login"}><span className="text-[#29b2fe]">Login</span></Link></h3></div>
            </div>
        </div>
    );
};

export default Register;