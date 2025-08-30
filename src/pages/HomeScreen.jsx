import React from "react";
import { Link } from "react-router-dom";

function HomeScreen() {
    return (
        <div className="relative flex bg-cover bg-no-repeat justify-center items-center h-[100dvh] w-full" style={{ backgroundImage: "url('/bg-img.jpg')" }}>


            <div className="relative z-10 flex flex-col gap-4 items-center justify-center">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-[347px] max-w-[90%]"
                />
                <Link
                    to="/register">
                    <div className="w-[303px] !p-[22px] flex justify-center items-center rounded-xl bg-[#E12200] cursor-pointer">
                        <span
                            className="poppins-medium text-white text-[20px] leading-none text-center w-full">

                            PROCEDER
                        </span>
                    </div>
                </Link>

            </div>

            <div className="absolute bottom-0 left-0 w-full z-20">
                <img
                    src="/bottom-bg.png"
                    alt="Bottom decoration"
                    className="w-full object-contain"
                />
            </div>
        </div >
    );
}

export default HomeScreen;




