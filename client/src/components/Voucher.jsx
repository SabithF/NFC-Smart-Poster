import React from 'react';
import QRCode from 'react-qr-code';

export default function Voucher({ value, voucherUnlocked, setActivePopup }) {
    return (

        <>
        <div className="absolute z-10 md:relative md:bottom-0 md:right-0 bottom-70 right-48 flex items-center justify-center text-white   h-16 w-16" 
        onClick={()=> setActivePopup(null)}>
                <img src="/assets/img/btn/ok.png" alt="close btn"  />
            </div>


        <div className="relative -mt-44 flex justify-center items-center w-full h-full max-w-3xl mx-auto">

           

            <div className="group relative w-full h-full[perspective:1000px]">


                <div className="transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] relative w-full h-full">


                    {/* Front side */}
                    <div className="flex flex-row">
                        <div className="absolute inset-0 [backface-visibility:hidden] ">
                            <img
                                src="/assets/img/voucher-front.png"
                                alt="Voucher"
                                className="object-cover w-full h-auto"
                            />
                            <div className="absolute top-6 flex flex-col justify-between items-start h-full w-full px-4">

                                <div className={`text-black font-semibold w-[80%] h-full p-3 rounded-lg `}>


                                    {voucherUnlocked ?

                                        (
                                            <>
                                                <p className={`font-mike text-center text-red-500 text-md tracking-wider mb-1 `}>
                                                    Congratulations
                                                </p>
                                                <p className={`font-brigada text-center text-sky-900 text-2xl tracking-wider mb-1`}>
                                                    Pre Sale Code
                                                </p>
                                                <p>
                                                    <span className={`flex text-red-700 font-medium text-center justify-center items-center font-outfit text-sm ${voucherUnlocked ? '' : 'text-gray-600 text-center items-center justify-center'}`}>
                                                        Click to reveal the code
                                                    </span>
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-center text-gray-600 font-outfit text-md w-[90%] ">
                                                Unlock the magic! <br />Collect all 5 badges to reveal your <br />exclusive voucher 🎁
                                            </p>
                                        )}





                                </div>

                                <div className="text-black flex w-full items-end justify-end -mt-5 -ml-3 font-xl">
                                    <img src="/assets/img/barcode.gif " alt="barcode" className='h-32 w-10 ' />
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Back side + QR */}
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <img
                            src="/assets/img/voucher-front.png"
                            alt="Voucher"
                            className="object-cover w-full h-auto"
                        />

                        <div className="absolute top-6 flex flex-row justify-between items-start h-full w-full px-4">
                            <div className="text-black font-semibold w-[80%] h-full p-3 rounded-lg">
                                <p className="font-brigada text-center text-sky-900 text-2xl tracking-wider mb-1">
                                    Pre Sale Code
                                </p>
                                <p>
                                    <span className="flex text-red-700 font-bold text-center justify-center items-center font-urbanist text-md">
                                        {value}
                                    </span>
                                </p>
                                {voucherUnlocked && (<div className="flex justify-center mt-1">
                                    <QRCode value={value} size={50} />
                                </div>)} <div className="text-center">to unclock the voucher Code</div>
                            </div>

                            <div className="w-[20%] text-center pt-5 rounded-lg h-fit p-2">
                                <p className="text-blue-950 text-sm font-outfit">
                                    Valid until:<br />
                                    <span className="font-bold">31st August 2025</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        </>
        
        
    );
}
