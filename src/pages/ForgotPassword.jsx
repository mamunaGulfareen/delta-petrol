import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };


    const validate = () => {
        let newErrors = {};

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const combinedMessage = Object.values(newErrors).join("\n");
            toast.error(combinedMessage, { autoClose: 5000 });
            return false;
        }

        return true;
    };

    const ForgotPassword = async (email) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const loginRes = await fetch(`${baseUrl}/auth/password/forgot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (!loginRes.ok) throw new Error("Request failed");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            await ForgotPassword(formData.email);
            toast.success("If the email exists, a reset code has been sent.");
            setTimeout(() => {
                navigate("/reset-password");
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Request failed. Try again!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="flex justify-center items-start w-full h-screen bg-gray-100">
                <div className="relative w-full md:max-w-[390px] h-screen md:min-h-0 md:h-[844px] overflow-hidden">
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
                    <div className="relative z-10 min-h-screen flex flex-col gap-6 items-center justify-center">

                        <form
                            onSubmit={handleSubmit}
                            className="w-full gap-10 flex flex-col justify-center items-center"
                        >
                            <img src="/logo.png" alt="" className='max-w-[301px]' />
                            <div className='gap-7 flex flex-col justify-center items-center'>


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
                                <button
                                    type="submit"
                                    className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                    disabled={loading}
                                >
                                    <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                        {loading ? "Verificando..." : "Enviar"}
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

export default ForgotPassword