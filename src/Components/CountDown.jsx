import React, { useState, useEffect } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const CountDown = ({ date }) => {
  const [digitStyle, setDigitStyle] = useState({ fontSize: 24, width: 50, height: 70 });
  const [labelFontSize, setLabelFontSize] = useState(14);
  const [dividerFontSize, setDividerFontSize] = useState(24);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDigitStyle({ fontSize: 22, width: 30, height: 45 });
        setLabelFontSize(12);
        setDividerFontSize(18);
      } else if (width < 1024) {
        setDigitStyle({ fontSize: 25, width: 50, height: 65 });
        setLabelFontSize(14);
        setDividerFontSize(22);
      } else {
        setDigitStyle({ fontSize: 32, width: 70, height: 100 });
        setLabelFontSize(32);
        setDividerFontSize(24);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center mt-5 animate-bounce">
        <h2 className="text-4xl md:text-6xl font-extrabold text-yellow-300 text-center drop-shadow-lg">
          🎆 Happy Diwali! 🎇
        </h2>
        <p className="text-yellow-100 mt-3 text-lg text-center italic">
          May your life be filled with light, love, and endless joy ✨
        </p>
      </div>
    );
  }

  return (
    <FlipClockCountdown
      to={date}
      labels={["Days", "Hours", "Minutes", "Seconds"]}
      labelStyle={{ fontSize: labelFontSize, fontWeight: "bold", color: "#fff" }}
      digitBlockStyle={{
        background: "linear-gradient(135deg, #FF6A00, #FFB347)",
        color: "#FFF",
        borderRadius: 6,
        ...digitStyle,
      }}
      dividerStyle={{
        color: "#FFF",
        fontSize: dividerFontSize,
        fontWeight: "bold",
      }}
      onComplete={() => setIsComplete(true)}
    />
  );
};

export default CountDown;
