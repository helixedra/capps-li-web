"use client";

import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed text-sm text-white/70 top-1/2 w-[calc(100vw-4rem)] md:w-[calc(100vw-16rem)] max-w-120 md:max-w-xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-4 shadow-lg z-50 rounded-sm">
        <div className="flex mx-auto flex-col justify-center items-start">
          <span className="">
            We use cookies to analyze website traffic and optimize your
            experience. By continuing, you agree to our use of cookies.
          </span>
          <div className="flex items-center justify-start w-full">
            <button
              className="mt-4 text-white border border-white/20 hover:opacity-80 cursor-pointer px-4 py-1 rounded"
              onClick={acceptCookies}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
