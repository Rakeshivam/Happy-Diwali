import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import share from "../assets/share-icon.png";
import whatsapp from "../assets/whatsapp-icon.png";
import facebook from "../assets/facebook-icon.png";
import instagram from "../assets/instagram-icon.png";
import copy from "../assets/copy-icon.png";
import send from "../assets/send-icon.png";

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle share button click
  const handleShareClick = (platform) => {
    setSelectedPlatform(platform);
    setModalOpen(true); // open modal for name input
    setOpen(false); // close dropdown
  };

  // Confirm share after name entry
  const confirmShare = () => {
    if (!userName.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    // Remove existing ?name param
    const baseUrl = window.location.origin + window.location.pathname;
    const finalUrl = `${baseUrl}?name=${encodeURIComponent(userName.trim())}`;

    const message = `${finalUrl}\n\nHappy Diwali! \n\nMay the festival of lights bring countless moments of joy and happiness to your life!\n\nCheck this out!`;

    if (selectedPlatform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    } else if (selectedPlatform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalUrl)}`,
        "_blank"
      );
    } else if (selectedPlatform === "instagram") {
      navigator.clipboard.writeText(finalUrl);
      toast.success("Link copied! Paste it on Instagram.");
    } else if (selectedPlatform === "copy") {
      navigator.clipboard.writeText(finalUrl);
      toast.success("Personalized link copied!");
    }

    setModalOpen(false);
    setUserName("");
    setSelectedPlatform(null);
  };

  return (
    <div className="relative w-fit">
      {/* Share Button */}
      <div
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="w-fit flex items-center gap-3 px-3 py-1 md:px-5 md:py-2 text-white rounded-md md:rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
      >
        <img src={share} className="w-3.5 h-3.5 md:w-5 md:h-5" alt="" />
        <p className="text-sm md:text-lg font-medium">Share Diwali Joy</p>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute bg-white/20 backdrop-blur-md mt-2 right-0 w-48 rounded-md shadow-lg overflow-hidden text-white animate-fadeIn z-50"
        >
          <button
            onClick={() => handleShareClick("whatsapp")}
            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/20 cursor-pointer"
          >
            <img src={whatsapp} className="w-5" alt="" />
            WhatsApp
          </button>
          <button
            onClick={() => handleShareClick("facebook")}
            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/20 cursor-pointer"
          >
            <img src={facebook} className="w-5" alt="" />
            Facebook
          </button>
          <button
            onClick={() => handleShareClick("instagram")}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-white/20 cursor-pointer"
          >
            <img src={instagram} className="w-6" alt="" />
            Instagram
          </button>
          <button
            onClick={() => handleShareClick("copy")}
            className="w-full flex items-center gap-3 px-5 py-2 text-left hover:bg-white/20 cursor-pointer"
          >
            <img src={copy} className="w-4" alt="" />
            Copy Link
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="bg-white rounded-md px-5 py-3 w-80 flex flex-col gap-4">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-center">Personalize Your Greeting</h3>
              <p className="text-sm text-gray-500 text-center w-[95%] mx-auto">Enter your name so your loved ones know who sent this Diwali wish 💖</p>
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  confirmShare();
                }
              }}
              className="w-[95%] px-4 py-1.5 text-sm border rounded-full text-black outline-none mx-auto"
            />
            <div className="flex gap-3 justify-end mt-3 text-sm font-medium">
              <button
                onClick={() => setModalOpen(false)}
                className="w-24 py-1 text-gray-700 border border-gray-700 rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="flex justify-center items-center gap-2 w-24 py-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-md cursor-pointer"
              >
                <img src={send} className="w-4 -rotate-[15deg] mb-1" alt="" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
