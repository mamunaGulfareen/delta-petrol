import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

function VerifyCode() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(new Array(6).fill("")); 
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (/^[0-9]$/.test(element.value) || element.value === "") {
            let newCode = [...code];
            newCode[index] = element.value;
            setCode(newCode);

            // Focus next input
            if (element.value !== "" && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("Text").slice(0, 6);
        const pasteArray = pasteData.split("");
        setCode((prev) => {
            let newCode = [...prev];
            for (let i = 0; i < pasteArray.length; i++) {
                if (/^[0-9]$/.test(pasteArray[i])) {
                    newCode[i] = pasteArray[i];
                }
            }
            return newCode;
        });
        // Focus last field
        if (pasteArray.length < 6) inputRefs.current[pasteArray.length].focus();
        else inputRefs.current[5].focus();
    };

    const validate = () => {
        if (!email) {
            toast.error("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email");
            return false;
        }

        if (code.includes("") || code.length !== 6) {
            toast.error("Enter complete 6-digit code");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const baseUrl = "https://www.deltalomaximo.com/gas_backend/";
            const res = await fetch(`${baseUrl}/auth/register/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    code: code.join("")
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Verification failed");
            }

            const data = await res.json();
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Email verified successfully!");
            navigate("/select-mode");
        } catch (error) {
            console.error(error);
            toast.error(error || "Verification failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-start w-full h-screen bg-gray-100">
                <div className="relative w-full md:max-w-[390px] h-screen md:min-h-0 md:h-[844px] overflow-hidden">
                    <div
                        className="fixed top-0 left-0 w-full h-full lg:hidden block bg-cover bg-center z-0"
                        style={{ backgroundImage: "url('/bg-img-2.png')" }}
                    ></div>
                    <div
                        className="absolute h-full inset-0 bg-cover hidden lg:block z-0 bg-no-repeat"
                        style={{ backgroundImage: "url('/bg-img-2.png')" }}
                    ></div>
                    <div className="relative z-10 min-h-screen flex flex-col gap-6 items-center justify-center">

                        <form
                            onSubmit={handleSubmit}
                            className="w-full gap-10 flex flex-col justify-center items-center"
                        >
                            <img src="/logo.png" alt="" className='max-w-[301px]' />
                            <div className="w-[303px] !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer w-full h-full px-4 !pb-[12px] !pt-[12px] placeholder-[#C1C1C1]  rounded-[12px] bg-transparent text-black poppins-medium text-[16px] focus:outline-none"
                                    placeholder="E-mail"
                                />
                            </div>


                            <div className="flex gap-2">
                                {code.map((num, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={num}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleChange(e.target, index)}
                                        onPaste={handlePaste}
                                        className="w-[45px] h-[55px] text-center text-white rounded-md border border-gray-300 text-[24px] focus:outline-none focus:border-[#E12200]"
                                    />
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                                disabled={loading}
                            >
                                <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                    {loading ? "Verifying..." : "Verificar"}
                                </span>
                            </button>

                            <Link
                                to="/login"
                                className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                            >
                                <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                    Volver al Login
                                </span>
                            </Link>

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

export default VerifyCode;
