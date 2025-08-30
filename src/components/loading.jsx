import React from 'react'

function Loading() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
                <div className="relative min-h-screen md:h-[844px] w-full md:max-w-[390px]  ">
                    <div
                        className="absolute h-full inset-0 bg-cover z-0"
                        style={{
                            backgroundImage: "url('/loading-bg.png')"
                        }}
                    ></div>


                    <div className="absolute top-32 w-full gap-10 flex flex-col justify-center items-center z-10">
                        <img src="/logo-2.png" alt="Logo" className="max-w-[85.8px]" />
                        <div className="relative gap-18 !mt-[35px] flex flex-col justify-center items-center w-full">
                            <img
                                src="/animation.gif"
                                alt="Loading animation"
                                className="w-[283px] h-[283px] object-contain"
                            />

                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                                <h1 className='poppins-medium font-medium text-[18px] leading-none text-center tracking-normal text-white'>
                                    Validando tu
                                    <h1 className='poppins-medium font-medium text-[18px] !mt-3 leading-none text-center tracking-normal text-white'>compra..</h1>

                                </h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading