import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };


    const validate = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email ";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }
        if (!formData.password) newErrors.password = "Password is missing";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const combinedMessage = Object.values(newErrors).join("\n");
            toast.error(combinedMessage, { autoClose: 5000 });
            return false;
        }

        return true;
    };

    const loginUser = async (email, password) => {
        const baseUrl = "https://www.deltalomaximo.com/gas_backend/";
        const loginRes = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!loginRes.ok) throw new Error("Login failed");

        const loginData = await loginRes.json();
        localStorage.setItem("token", JSON.stringify(loginData.token));
        localStorage.setItem("user", JSON.stringify(loginData));
        return loginData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            await loginUser(formData.email, formData.password);
            toast.success("Login successful!");
            navigate("/select-mode");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Login failed. Try again!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="flex justify-center items-start w-full h-screen bg-gray-100">
                <div className="relative w-full md:max-w-[390px] pb-3 h-screen md:min-h-0 md:h-[844px] overflow-hidden">
                    <div
                        className="fixed top-0 left-0 w-full h-full lg:hidden block bg-cover bg-center z-0 "
                        style={{ backgroundImage: "url('/bg-img-2.png')" }}
                    ></div>
                    <div
                        className="absolute h-full inset-0 bg-cover hidden lg:block z-0 bg-no-repeat"
                        style={{
                            backgroundImage: "url('/bg-img-2.png')"
                        }}
                    ></div>
                    <div className="relative  z-10 min-h-screen flex flex-col  gap-5 items-center justify-center">

                        <form
                            onSubmit={handleSubmit}
                            className="w-full gap-7 flex flex-col justify-center items-center"
                        >
                            <img src="/logo.png" alt="" className='max-w-[301px]' />
                            <div className='gap-6 flex flex-col justify-center items-center'>


                                <div className="w-[303px] !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="peer w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1]  rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                                        placeholder="E-mail"
                                    />
                                </div>

                                <div className="w-[303px]  !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1] rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                                        placeholder="Contraseña"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                    disabled={loading}
                                >
                                    <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                        {loading ? "Loading..." : "EMPEZAR"}
                                    </span>
                                </button>
                                <Link
                                    to="/forgot-password">
                                        <a
                                            className="poppins-medium underline text-white text-[20px] leading-none text-center w-full">

                                            Olvide mi Contraseña
                                        </a>
                                    
                                </Link>
                                <Link
                                    to="/register"
                                    className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                >
                                    <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                         REGISTRATE
                                    </span>
                                </Link>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Login;