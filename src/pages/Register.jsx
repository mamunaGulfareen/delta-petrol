import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkExistingUser = async () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (token && userData) {

                toast.success("Welcome back!");
                navigate("/select-mode");
            }
        };

        checkExistingUser();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };


    const validate = () => {
        let newErrors = {};

        if (!formData.name) newErrors.name = "Name";
        if (!formData.email) {
            newErrors.email = "Email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.password) newErrors.password = "Password";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const errorKeys = Object.values(newErrors);

            if (
                !formData.name &&
                !formData.email &&
                !formData.password
            ) {
                toast.error("Please fill name,email,password fields", { autoClose: 5000 });
            } else {
                const combinedMessage = errorKeys.join(", ") + " is missing";
                toast.error(combinedMessage, { autoClose: 5000 });
            }

            return false;
        }

        return true;
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const baseUrl = import.meta.env.VITE_BASE_URL;
        setLoading(true);

        try {


            const res = await fetch(`${baseUrl}/auth/register/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                let message = errorData.error || "Failed to register";

                if (message == "Email already in use") {
                    message = "Cuenta existente";
                }

                throw new Error(message);

            }


            toast.success("Registration  successful! ");
            setTimeout(() => navigate("/verify-email"), 2000);


        } catch (error) {
            console.error(error);
            toast.error(error.message || "Registration failed. Try again!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="flex justify-center items-start w-full h-screen bg-gray-100 overflow-hidden overflow-y-auto overflow-x-auto">
                <div className="relative w-full pb-3 md:max-w-[390px] h-full md:min-h-0 md:h-[844px] overflow-hidden overflow-y-auto overflow-x-auto">
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
                    <div className="relative z-10  h-full flex flex-col  items-center justify-center ">

                        <form
                            onSubmit={handleSubmit}
                            className="w-full gap-5 flex flex-col justify-center items-center"
                        >
                            <img src="/logo.png" alt="" className='max-w-[301px]' />
                            <div className='gap-4 flex flex-col justify-center items-center'>

                                <div className="w-[303px]  !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="peer w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1]  rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                                        placeholder="Name"
                                    />
                                </div>
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
                                <div className="w-[303px] !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
                                    <input

                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="peer w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1]  rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                                        placeholder="Teléfono"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                    disabled={loading}
                                >
                                    <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                        {loading ? "Loading..." : "REGISTRATE"}
                                    </span>
                                </button>
                                <Link
                                    to="/login"
                                    className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                >
                                    <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                        EMPEZAR
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

export default Register;