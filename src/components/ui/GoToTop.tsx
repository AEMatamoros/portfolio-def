import { useState, useEffect } from "react";

//Scroll to top
export const scrollToTop = () => {
  console.log("first");
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

export default function GoTop() {
  const [scroll, setScroll] = useState(false);

  //Navbar Effect on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100 ? true : false);
    });
  }, []);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        onClick={scrollToTop}
        className={`${scroll ? "opacity-80" : "opacity-0"} goTop
            transformation -rotate-45
           fixed bottom-4 right-4 h-8 w-8 cursor-pointer text-detail fill-gray-600 transition-all duration-1000`}
      >
        <path d="M384 32c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l320 0zM160 160c-6.5 0-12.3 3.9-14.8 9.9s-1.1 12.9 3.5 17.4l40 40-71 71C114 302 112 306.9 112 312s2 10 5.7 13.7l36.7 36.7c3.6 3.6 8.5 5.7 13.7 5.7s10-2 13.7-5.7l71-71 40 40c4.6 4.6 11.5 5.9 17.4 3.5s9.9-8.3 9.9-14.8l0-144c0-8.8-7.2-16-16-16l-144 0z" />
      </svg>
    </>
  );
}
