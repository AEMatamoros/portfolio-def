import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fadeOut) {
      const fadeTimer = setTimeout(() => setVisible(false), 1000);
      return () => clearTimeout(fadeTimer);
    }
  }, [fadeOut]);

  // Hide scroll when visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-100 transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      } bg-white dark:bg-black`}
    >
      <div className="flex text-4xl">
        {["A", "E", "M", "M", ".", ".", "."].map((letter, idx) => (
          <span
            key={idx}
            className="text-dark dark:text-white text-6xl font-bold"
            style={{
              opacity: 0,
              animation: `fadeInLetter 0.3s forwards`,
              animationDelay: `${idx * 0.25}s`,
            }}
          >
            {letter}
          </span>
        ))}
        <style>
          {`
        @keyframes fadeInLetter {
          to {
            opacity: 1;
          }
        }
        `}
        </style>
      </div>
    </div>
  );
};

export default SplashScreen;
