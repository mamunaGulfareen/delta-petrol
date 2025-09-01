/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/loading";
function EditProfile() {
    const navigate = useNavigate();

    useEffect(() => {

        const checkExistingUser = async () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (!token && !userData) {

                toast.success("Login again!");
                navigate("/login");
            }
        };

        checkExistingUser();
    }, [navigate]);
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });
    const [countryCode, setCountryCode] = useState("+1");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [fetching, setFetching] = useState(true);
    const token = JSON.parse(localStorage.getItem("token"));
    const baseUrl =import.meta.env.VITE_BASE_URL;
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                setFetching(true);
                const res = await fetch(`${baseUrl}/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch user data");
                const data = await res.json();

                let userPhone = data.phone || "";

                setFormData({
                    name: data.name || "",
                    phone: userPhone || ""
                });
            } catch (error) {
                console.error(error);
                toast.error(error.message || "Failed to load user data");
            } finally {
                setFetching(false);

            }
        };

        fetchUser();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name";
        if (!formData.phone) newErrors.phone = "Phone is missing";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error(Object.values(newErrors).join("\n"), { autoClose: 5000 });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    phone: countryCode + formData.phone.replace(/^0+/, "")
                })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            toast.success("Profile updated successfully!");
            setTimeout(() => navigate("/select-mode"), 2000);

        } catch (error) {
            console.error(error);
            toast.error(error.message || "Update failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logout successfully!");
        setTimeout(() => navigate("/login"), 2000);
        window.location.href = "/login";
    }

    return (
        <>
            {fetching ? (
                <Loading />
            ) : (
                <div className="flex justify-center items-start w-full h-screen bg-gray-100 overflow-hidden">
                    <div className="relative w-full md:max-w-[390px] pb-3 h-full md:min-h-0 md:h-[844px] overflow-hidden">
                        <div
                            className="fixed top-0 left-0 w-full h-full lg:hidden block bg-cover bg-center z-0"
                            style={{ backgroundImage: "url('/bg-img-2.png')" }}
                        ></div>
                        <div
                            className="absolute h-full inset-0 bg-cover hidden lg:block z-0 bg-no-repeat"
                            style={{ backgroundImage: "url('/bg-img-2.png')" }}
                        ></div>
                        <div className="relative z-10 h-full flex flex-col gap-4 items-center justify-center overflow-hidden">

                            <form
                                onSubmit={handleSubmit}
                                className="w-full gap-5 flex flex-col justify-center items-center"
                            >
                                <img src="/logo.png" alt="" className='max-w-[301px]' />

                                <div className="w-[303px] !pl-[11px] !pr-[2px] bg-white rounded-[12px] flex items-center shadow-md relative">
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
                                        {loading ? "Loading..." : "Actualizar perfil"}
                                    </span>
                                </button>
                            </form>

                            <button
                                onClick={logout}
                                className="w-[303px] !p-[21px] flex justify-center cursor-pointer items-center rounded-xl bg-[#E12200] disabled:opacity-50"
                            >
                                <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                    Salir
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}


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

export default EditProfile;
