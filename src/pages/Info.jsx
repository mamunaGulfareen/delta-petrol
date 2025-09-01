import React from 'react'
import { Link } from 'react-router-dom'

function Info() {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            <div className="relative h-full md:h-[844px] w-full md:max-w-[390px] overflow-hidden overflow-y-auto overflow-x-auto">
                <div
                    className="absolute inset-0 h-full bg-cover z-0"
                    style={{ backgroundImage: "url('/bg-img-6.png')" }}
                ></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center gap-10 px-6 text-center">
                    <img src="/logo-2.png" alt="Logo" className="max-w-[171.5px]" />

                    <div className="flex flex-col text-white items-center space-y-6">
                        <h1 className="poppins-medium font-medium text-[35px] leading-[37px]">
                            ESTAMOS VALIDANDO<br />TU FACTURA
                        </h1>

                        <p className="poppins-medium font-normal text-[20px] leading-[26px] max-w-xs">
                            Esto puede tomar un Tiempo, te notificaremos una vez tengas tus cupones.{" "}
                            <span className="font-bold text-[20px] leading-[26px]">¡GRACIAS!</span>
                        </p>
                    </div>

                    <Link to="/coupen-detail">
                        <div className="w-[303px] !p-[21px] flex justify-center items-center rounded-xl bg-[#57ABF0]">
                            <span className="poppins-medium text-white text-[20px] leading-[100%] tracking-[0] text-center">
                                VER CUPONES
                            </span>
                        </div>
                    </Link>

                    <Link to="/select-mode">
                        <img src="/arrow-left.png" alt="Arrow Left" className="w-[28px]" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Info
