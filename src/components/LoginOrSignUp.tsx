import { useState } from "react";
import { AuthData } from "../interface/AuthData";
import side_img from "../assets/side_img.jpg";
import signup_img from "../assets/sign_up.jpg";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loginReturn } from "../interface/loginReturn";
import { signUpReturn } from "../interface/signUpReturn";

export const Login = (loginOrSignUp: boolean) => {
    /*This is a dymanic component 
    if True then display login page else signup page
    */

    //common payload for both login and signup
    const [data, setData] = useState<AuthData>({
        username: '',
        password: '',
        cpassword: '',

    });

    const text = loginOrSignUp ? ('Log In') : ('Sign Up');

    const handleForm = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {

        event.preventDefault();

        if (loginOrSignUp) {
            //login function

            //fetch call
            const responseFromServer = await fetch('https://private-route-backend.vercel.app/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as loginReturn;

            if (responseFromServer.success) {
                //reload will tigger authentication()
                window.location.reload();
            }
            else {
                toast.error(`${responseFromServer.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }


        }
        else {
            //Sign up data
            //check password and comfirm password
            if (data.password === data.cpassword) {

                const responseFromServer = await fetch('https://private-route-backend.vercel.app/signup', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    return res.json();
                }).then((jsonData) => {
                    return jsonData;
                }) as signUpReturn;

                if (responseFromServer.success) {
                    /*this will triiger authentication() -> if successfuly login show confidential data */
                    window.location.replace('/');
                }
                else {
                    toast.error(`${responseFromServer.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }
            else {
                toast.error('Password do not match', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }


        }

    }

    //Handle change in Input filed
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value
        });
    }


    return (
        <>
            <ToastContainer />

            <div className="flex min-h-screen min-w-min justify-center items-center">

                <div className="bg-grey-transparency rounded-2xl m-5 p-5 xl:grid grid-cols-2 items-center">
                    <div>
                        {/* Side Image */}
                        <div className="hidden xl:block  w-80 ">
                            {loginOrSignUp ? (
                                <img src={side_img} alt="side_img" className="rounded-xl shadow-2xl" />) : (<img src={signup_img} alt="side_img" className="rounded-xl shadow-2xl" />)}
                        </div>
                    </div>
                    {/* Login In */}
                    <div className="grid gap-4 ">

                        <h1 className="font-extrabold text-center text-5xl text-white font-">
                            {text}
                        </h1>
                        <p className="text-white text-lg">Try out the working of Private Route with Cookies</p>
                        <div className="place-content-center grid gap-4">
                            <form className="space-y-6" onSubmit={handleForm}>
                                {/* username */}
                                <div className="relative ">
                                    <div className="absolute p-1 pl-2">
                                        {/* icon */}
                                        <i className="fa fa-envelope" aria-hidden="true" />

                                    </div>
                                    <input type="email" onChange={handleChange} value={data.username as string} name="username" id="username" placeholder="Email Address" required className="w-56 rounded-xl px-10 py-1 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-amber-50" />
                                </div>
                                {/* password */}
                                <div className="relative">
                                    <div className="absolute p-1 pl-2">
                                        {/* icon */}
                                        <i className="fa fa-key" aria-hidden="true" />
                                    </div>
                                    <input type="password" onChange={handleChange}
                                        value={data.password as string} name="password" id="password" placeholder="Password" required className="w-56 rounded-xl px-10 py-1 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-amber-50" />
                                </div>
                                {/* confirm password */}
                                {loginOrSignUp ? (<></>) : (

                                    <div className="relative">
                                        <div className="absolute p-1 pl-2">
                                            {/* icon */}
                                            <i className="fa fa-key" aria-hidden="true" />
                                        </div>
                                        <input type="password" onChange={handleChange}
                                            value={data.cpassword as string} name="cpassword" id="cpassword" placeholder="Confirm Password" required className="w-56 rounded-xl px-10 py-1 focus:outline-none focus:ring focus:ring-yellow-400 focus:bg-amber-50" />
                                    </div>
                                )}
                                <button className="bg-yellow-300 p-1 rounded-xl w-56 text-lg"> {text}</button>
                            </form>
                        </div>
                        <div className="text-white ">
                            {loginOrSignUp ? (<p>Don't have an account?
                                <a href="/signup" className="text-yellow-200 font-bold"> Create new account</a>
                            </p>) : (<p>Have an account?
                                <a href="/" className="text-yellow-200 font-bold"> Click to Log In</a>
                            </p>)
                            }




                        </div>

                    </div>
                </div>
            </div>
        </>



    );
}