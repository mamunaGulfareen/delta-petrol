import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function SelectMode() {
    const navigate = useNavigate();

    useEffect(() => {

        const checkExistingUser = async () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (!token && !userData) {
                navigate("/login");
            }
        };

        checkExistingUser();
    }, [navigate]);
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            <div className="relative h-full md:h-[844px] w-full md:max-w-[390px] overflow-hidden overflow-y-auto overflow-x-auto">
                <div
                    className="fixed block lg:hidden inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/bg-img-3.png')" }}
                ></div>

                <div
                    className="absolute h-full hidden lg:block inset-0 bg-cover z-0"
                    style={{ backgroundImage: "url('/bg-img-3.png')" }}
                ></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center gap-9">
                    <img src="/logo.png" alt="" className="max-w-[301px]" />

                    <div className="flex flex-col justify-center items-center gap-7">
                        <Link to="/qr-code-scanner">
                            <div className="w-[303px] !p-[21px] flex justify-center items-center rounded-xl bg-[#E12200]">
                                <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                    ESCANEAR
                                </span>
                            </div>
                        </Link>
                        <Link to="/coupen-detail">
                            <div className="w-[303px] !p-[21px] flex justify-center items-center rounded-xl bg-[#57ABF0]">
                                <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                    VER CUPONES
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="pt-10">
                        <a
                            href="https://www.petrodelta.com/pa/promolomaximo/"
                            target="_blank"
                            rel="noopener noreferrer"
                       >
                            <p className="font-Calibri font-normal text-[10px] leading-[52px] text-white tracking-normal text-center underline">
                                Ver terminos y condiciones
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SelectMode;