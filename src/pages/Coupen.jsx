import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../components/loading';
function Coupen() {
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
    const [fetching, setFetching] = useState(true);

    const [couponSummary, setCouponSummary] = useState(null);
    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem("token"));

    const baseUrl = "https://www.deltalomaximo.com/gas_backend/";

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                setFetching(true);

                const res = await fetch("https://www.deltalomaximo.com/gas_backend/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch user data");
                const data = await res.json();

                setProfile(data);

            } catch (error) {
                console.error(error);
                toast.error(error.message || "Failed to load user data");
            } finally {
                setFetching(false);

            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchCouponSummary = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${baseUrl}/invoices/coupons/summary`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch coupon summary");

                const data = await res.json();
                setCouponSummary(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCouponSummary();
    }, [token, baseUrl]);

    return (
        <>
            {fetching ?
                (
                    <Loading />
                ) : (
                    <div className="flex justify-center items-center h-screen w-full bg-gray-100">
                        <div className="relative h-full pb-3 md:h-[844px] w-full md:max-w-[390px] overflow-hidden">

                            <div
                                className="fixed block lg:hidden inset-0 bg-cover bg-center z-0"
                                style={{ backgroundImage: "url('/bg-img-4.png')" }}
                            ></div>

                            <div
                                className="absolute h-full hidden lg:block inset-0 bg-cover z-0"
                                style={{ backgroundImage: "url('/bg-img-4.png')" }}
                            ></div>


                            <div className="relative z-10 h-full flex flex-col justify-center items-center gap-10 px-4">
                                <img src="/logo-2.png" alt="" className="max-w-[71.5px]" />

                                <div className="gap-6 flex flex-col justify-center items-center">
                                    <div>
                                        <h1 className="font-calibri font-bold text-[27px] leading-[30px] text-white text-center">
                                            {profile?.name}
                                        </h1>
                                        <h1 className="font-calibri mt-4 font-normal text-[22px] leading-[30px] text-center text-white">
                                            {profile?.email}
                                        </h1>
                                        <h1 className="font-calibri font-normal text-[22px] leading-[30px] text-center text-white">
                                            {profile?.phone}
                                        </h1>
                                    </div>

                                    <div>
                                        {loading ? (
                                            <h1 className="poppins-medium font-medium text-[40px] text-center text-white">
                                                Loading...
                                            </h1>
                                        ) : (
                                            <>
                                                <h1 className="poppins-medium font-extrabold text-[160px] leading-[100%] text-center text-white">
                                                    {couponSummary?.remaining || 0}
                                                </h1>
                                                <h1 className="poppins-medium font-medium text-[40px] text-center text-white">
                                                    Cupones
                                                </h1>
                                            </>
                                        )}
                                    </div>

                                    <Link to="/select-mode">
                                        <div className="w-[303px] !p-[22px] flex justify-center items-center rounded-xl bg-[#E12200] cursor-pointer">
                                            <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center w-full"
                                            >
                                                FINALIZAR
                                            </span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/edit-profile">
                                        <div className="w-[303px] !p-[22px] flex justify-center items-center rounded-xl bg-[#E12200] cursor-pointer">
                                            <span
                                                className="poppins-medium text-white text-[20px] leading-none text-center w-full">

                                                Edit Profile
                                            </span>
                                        </div>
                                    </Link>

                                    <div className="w-full flex justify-center items-center">
                                        <Link to="/select-mode">
                                            <img src="/arrow-left.png" alt="Arrow Left" className="w-[28px]" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


        </>
    )
}

export default Coupen