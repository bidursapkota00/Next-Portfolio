"use client";

import { useEffect, useState } from "react";
import { X, Info } from "lucide-react";

export default function ToggleFullScreen() {
  const [readMode, setReadMode] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const makeFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err);
      });
    }
  };

  useEffect(() => {
    if (readMode) {
      makeFullScreen();
      setShowInfo(false);
    } else {
      document.exitFullscreen().catch(() => {});
      setShowInfo(true);
    }
  }, [readMode]);

  useEffect(() => {
    let tapTimes: number[] = [];

    const handleTouchEnd = (e: TouchEvent) => {
      const currentTime = Date.now();

      // Remove taps older than 600ms
      tapTimes = tapTimes.filter((t) => currentTime - t < 600);
      tapTimes.push(currentTime);

      if (tapTimes.length >= 3) {
        tapTimes = [];
        setReadMode((mode) => !mode);
        e.preventDefault();
      }
    };

    let clickTimes: number[] = [];

    const handleClick = () => {
      const currentTime = Date.now();

      // Remove clicks older than 600ms
      clickTimes = clickTimes.filter((t) => currentTime - t < 600);
      clickTimes.push(currentTime);

      if (clickTimes.length >= 3) {
        clickTimes = [];
        setReadMode((mode) => !mode);
      }
    };

    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {readMode && (
        <style>{`
          .sidebar__content, .sidebar__hamburger {
              display: none
          }
          @media screen and (min-width: 768px) {
              body {
                  margin-left: 0;
              }
          }

          @media screen and (min-width: 1200px) {
              body {
                  margin-left: calc((100% - 1200px) / 2);
                  margin-right: calc((100% - 1200px) / 2);
              }
          }
        `}</style>
      )}

      {showInfo && (
        <div className="m-5 bg-yellow-100 border border-yellow-300 text-yellow-800 pl-12 py-3 rounded-lg shadow-md flex items-start justify-center gap-3">
          <Info size={18} className="shrink-0 mt-0.5 text-yellow-600" />
          <div className="text-sm">
            <b>Triple click to toggle Read Mode</b>.
          </div>
          <button
            onClick={() => setShowInfo(false)}
            className="shrink-0 ml-2 p-1 rounded-full hover:bg-yellow-200"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
