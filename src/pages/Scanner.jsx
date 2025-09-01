/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Scanner } from "@yudiel/react-qr-scanner";
import Lottie from "lottie-react";


function Scane() {
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
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const startTimeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    console.log("Scanning state changed:", isScanning);
    console.log("Scan result:", scanResult);

    if (isScanning && !scanResult) {
      startTimeRef.current = Date.now();
      console.log("Started scanning at:", startTimeRef.current);
    }
  }, [isScanning, scanResult]);
  useEffect(() => {
    fetch("/complete.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));


  const baseUrl = import.meta.env.VITE_BASE_URL;

  const sendScanResult = async (result) => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/invoices/scrape`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: result }),
      });
      console.log('response', res);
      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        toast.error(errData?.error || res.statusText || "Something went wrong");
        return;
      }
      const data = await res.json();
      const { ...invoicePayload } = data;

      const response = await fetch(`${baseUrl}/invoices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoicePayload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);

        // Detect duplicate invoice error
        if (errData?.error?.includes("E11000")) {
          toast.error("Esta Factura ya fue Escaneada");
        } else {
          toast.error(errData?.error || response.statusText || "Something went wrong");
        }

        return;
      }

      const finalData = await response.json();
      navigate("/detail", { state: { invoice: finalData } });
    } catch (err) {
      console.error(err);
      toast.error("Error in Api. Try again!");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scanResult) {
      sendScanResult(scanResult);
    }
  }, [scanResult]);

  const handleScan = (result) => {
    if (result) {
      const rawValue = result[0]?.rawValue || "";
      console.log("Scanned QR:", rawValue);
      setScanResult(rawValue);
      setIsScanning(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        console.log("✅ QR detect hua in:", elapsed, "seconds");
        toast.info(`QR detect hua in ${elapsed} seconds`);
      }

      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      if (!isScanning) {
        setIsScanning(true);
      }
    }
  }
  useEffect(() => {
    let timer;
    let interval;

    if (isScanning && !scanResult) {
      startTimeRef.current = Date.now();

      // ⏱ Log elapsed time every second
      interval = setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          console.log("⏱ Scanning... elapsed:", elapsed, "seconds");
        }
      }, 1000);

      // Set timeout for 20 seconds
      timer = setTimeout(() => {
        if (startTimeRef.current) {
          const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
          console.log("⏱ Timeout after:", elapsed, "seconds");
          setIsScanning(false);
          navigate("/scanner-info");
        }
      }, 30000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isScanning, scanResult, navigate]);
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full bg-gray-100 overflow-hidden overflow-y-auto overflow-x-auto">
        <div className="relative h-full md:h-[844px] w-full md:max-w-[390px] overflow-hidden overflow-y-auto overflow-x-auto">

          <div
            className="absolute lg:block hidden h-full inset-0 bg-cover z-0"
            style={{
              backgroundImage: "url('/bg-img-4.png')"
            }}
          ></div>


          <div
            className="fixed lg:hidden block inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: "url('/bg-img-4.png')"
            }}
          ></div>


          <div className="relative z-10 h-full flex flex-col justify-center items-center gap-9 px-4">
            <img src="/logo-2.png" alt="Logo" className="max-w-[71.5px]" />

            <div className="gap-7 flex flex-col justify-center items-center w-full">
              <h1 className="font-calibri text-white text-[27px] flex flex-col leading-[30px] text-center">
                <span className="font-bold">  Coloca el QR de tu  </span>
                <span className="font-normal">factura en el visor.</span>
              </h1>

              <div className="relative w-[296px] h-[294px] rounded-[22.5px] flex justify-center items-center">
                <div
                  className="absolute inset-0 rounded-[22.5px] !p-[4.5px] pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, #EA2C38 0%, #F6B704 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                ></div>

                <div className="w-[280px] h-[280px] rounded-[12px] overflow-hidden">
                  <Scanner onScan={handleScan} components={{ finder: false }} sound={false} constraints={{ facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 }, }} scanDelay={500} />

                </div>
              </div>
              {showSuccess && animationData && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                  <Lottie
                    animationData={animationData}
                    loop={false}
                    style={{ width: "75%", height: "75%" }}
                  />
                </div>
              )}



              <div className="w-full flex justify-center items-center">
                <Link to="/select-mode">
                  <img
                    src="/white-arrow.png"
                    alt="Arrow Left"
                    className="w-[28px]"
                  />
                </Link>
              </div>
            </div>
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

export default Scane;
