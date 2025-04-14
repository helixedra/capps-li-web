"use client";
import { TypeAnimation } from "react-type-animation";
import styles from "./cursor.module.css";
import Random3DScene from "./Random3DScene";

export default function Home() {
  return (
    <>
      <div
        className="flex px-12 py-24 flex-col h-screen justify-center"
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
    </>
  );
}
