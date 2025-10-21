import React from "react";
import { useSearchParams } from "react-router-dom";
import ShareButton from "./Components/ShareButton";
import backgroundVideo from "/background.mp4";
import backgroundVideo_mobile from "/background-mobile.mp4";
import CountDown from "./Components/CountDown";
import { Toaster } from "react-hot-toast";

const App = () => {
  const deepavaliDate = new Date("2026-11-08T00:00:00");

  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[linear-gradient(135deg,#33004d,#170425,#0a0014)]">
      <Toaster/>
      
      {/* Video Background */}
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src={backgroundVideo_mobile} media="(max-width: 767px)" type="video/mp4" />
        <source src={backgroundVideo} media="(min-width: 768px)" type="video/mp4" />
      </video>

      {/* Overlay content */}
      <div className="relative z-10 w-full h-full flex justify-center px-5 py-5">
        
        <div className="relative flex flex-col items-center max-w-[1400px] w-full">
          

          {/* Share Button */}
          <div className="w-full flex justify-end items-center mb-4">
            <ShareButton />
          </div>

          {/* Main content */}
          <div className="flex flex-col justify-center items-center gap-8 py-5 w-full h-full">

            {/* Titles */}
            <div className="flex flex-col justify-center items-center gap-2">
              <h2
                className="h-[60px] md:h-[80px] text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text shiny-text
                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
                  drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]
                  drop-shadow-[0_6px_6px_rgba(0,0,0,0.2)]
                  text-center"
              >
              Happy Diwali
              </h2>

              <h2
                className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text
                  bg-gradient-to-r from-yellow-200 via-orange-300 to-yellow-200
                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
                  drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]
                  drop-shadow-[0_6px_6px_rgba(0,0,0,0.2)]
                  text-center"
              >
                {name ? `${name}!` : ""} <span className="text-neutral-800">🪔</span>
              </h2>
            </div>

            <CountDown date = {deepavaliDate} />

            {/* Message box */}
            <div className="bg-white/5 backdrop-blur-md border-[1px] border-yellow-50 rounded-xl p-4 max-w-md sm:max-w-lg mx-auto">
              <p className="text-yellow-200 text-sm sm:text-lg text-center">
                "May the festival of lights bring countless moments of joy and
                happiness to your life!"<br />
                <a href="https://www.instagram.com/rakeshkushwaha.in/#">— Rakesh Kushwaha</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
