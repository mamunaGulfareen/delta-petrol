import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        code: new Array(6).fill(""),
        newPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCodeChange = (element, index) => {
        if (/^[0-9]$/.test(element.value) || element.value === "") {
            const newCode = [...formData.code];
            newCode[index] = element.value;
            setFormData({ ...formData, code: newCode });

            if (element.value !== "" && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("Text").slice(0, 6);
        const pasteArray = pasteData.split("");
        setFormData((prev) => {
            const newCode = [...prev.code];
            for (let i = 0; i < pasteArray.length; i++) {
                if (/^[0-9]$/.test(pasteArray[i])) newCode[i] = pasteArray[i];
            }
            return { ...prev, code: newCode };
        });
        if (pasteArray.length < 6) inputRefs.current[pasteArray.length].focus();
        else inputRefs.current[5].focus();
    };

    const validate = () => {
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Invalid email");
            return false;
        }
        if (formData.code.includes("") || formData.code.length !== 6) {
            toast.error("Enter complete 6-digit code");
            return false;
        }
        if (!formData.newPassword) {
            toast.error("Password is required");
            return false;
        }
        return true;
    };
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await fetch(`${baseUrl}/auth/password/reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    code: formData.code.join(""),
                    newPassword: formData.newPassword
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Reset failed");
            }

            toast.success("Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Reset failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-start w-full h-screen bg-gray-100">
                <div className="relative w-full pb-3 md:max-w-[390px] h-screen md:min-h-0 md:h-[844px] overflow-hidden">
                    <div
                        className="fixed top-0 left-0 w-full h-full lg:hidden block bg-cover bg-center z-0"
                        style={{ backgroundImage: "url('/bg-img-2.png')" }}
                    ></div>
                    <div
                        className="absolute h-full inset-0 bg-cover hidden lg:block z-0 bg-no-repeat"
                        style={{ backgroundImage: "url('/bg-img-2.png')" }}
                    ></div>
                    <div className="relative z-10 h-full flex flex-col  items-center justify-center overflow-hidden">

                        <form onSubmit={handleSubmit} className="w-full gap-5 flex flex-col justify-center items-center">
                            <img src="/logo.png" alt="" className="max-w-[301px]" />

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

                            <div className="flex gap-2">
                                {formData.code.map((num, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={num}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleCodeChange(e.target, index)}
                                        onPaste={handlePaste}
                                        className="w-[45px] h-[55px] text-center rounded-md border text-white border-gray-300 text-[24px] focus:outline-none focus:border-[#E12200]"
                                    />
                                ))}
                            </div>

                            <div className="w-[303px]  !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
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
                                    {loading ? "Verificando..." : "Restablecer contraseña"}
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
    );
}

export default ResetPassword;
