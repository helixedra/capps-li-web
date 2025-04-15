"use client";
import { TypeAnimation } from "react-type-animation";
import styles from "./cursor.module.css";
import Random3DScene from "./Random3DScene";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import CookieConsent from "./CookieConsent";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie_consent");
      setHasConsent(consent === "true");
      // Listen for consent changes from CookieConsent
      const handler = () => {
        const updatedConsent = localStorage.getItem("cookie_consent");
        setHasConsent(updatedConsent === "true");
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    }
  }, []);
  return (
    <>
      <div
        className="flex px-12 py-24 h-[calc(100vh-8rem)] md:h-screen md:py-24 flex-col justify-center overflow-hidden snap-y"
        style={{
          animation: "fadeIn 1s ease-in-out forwards",
          animationDelay: "1s",
        }}
      >
        <div className="max-w-72 mb-auto">
          We <span className="text-amber-400">craft</span> innovative{" "}
          <span className="text-amber-400">apps</span> that bring ideas to life
        </div>
        <div className="text-6xl flex items-center justify-start w-full mt-32">
          <div className="opacity-30">{">"}</div>
          <TypeAnimation
            cursor={false}
            sequence={[
              "cr",
              200,
              "creat",
              200,
              "create",
              1000,
              "cr",
              50,
              "c",
              200,
              "ap",
              100,
              "app",
              300,
              "apps",
              1200,
              "c",
              200,
              "ca",
              210,
              "cap",
              100,
              "capp",
              100,
              "capps",
              800,
              "capps.",
              20000,
            ]}
            wrapper="span"
            speed={20}
            className={styles.type}
            style={{ display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
        <Random3DScene />
      </div>
      <CookieConsent />
      {hasConsent && (
        <>
          <GoogleAnalytics gaId="G-K3S605JHCR" />
          <GoogleTagManager gtmId="G-K3S605JHCR" />
        </>
      )}
    </>
  );
}
