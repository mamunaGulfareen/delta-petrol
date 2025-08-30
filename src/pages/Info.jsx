import React from 'react'
import { Link } from 'react-router-dom'
function Screen_6() {
    return (
        <div className="flex justify-center items-center h-screen w-full bg-gray-100">
            <div className="relative h-full md:h-[844px] w-full md:max-w-[390px] overflow-hidden">
                <div
                    className="absolute h-full inset-0 bg-cover z-0"
                    style={{
                        backgroundImage: "url('/bg-img-6.png')"
                    }}
                ></div>


                <div className="absolute  top-47 w-full gap-1 flex flex-col justify-center items-center z-10">
                    <img src="/logo-2.png" alt="Logo" className="max-w-[171.5px]" />

                    <div className="gap-14 !mt-18 flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col text-white items-center text-center space-y-4">

                            <h1 className="poppins-medium font-medium text-[35px] leading-[37px]">
                                ESTAMOS VALIDANDO<br />TU FACTURA
                            </h1>

                            <p className="poppins-medium !pt-6 font-normal text-[20px] leading-[26px] max-w-xs">
                                Esto puede tomar un ;empo, te no;ficareemos una vez tengas tus cupones. <span className='font-bold text-[20px] leading-[26px] text-center'>¡GRACIAS!</span>
                            </p>

                        </div>
                    </div>
                </div>
                <div className='absolute bottom-28  left-0 w-full  z-10'>
                    <div className="w-full flex justify-center items-center">
                        <Link to="/select-mode">
                            <img src="/arrow-left.png" alt="Arrow Left" className="w-[28px]" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Screen_6