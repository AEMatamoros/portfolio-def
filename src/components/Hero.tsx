import Header from "@Components/common/Header";

import SplitText from "@Components/animations/SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function Hero() {
  return (
    <section className="min-h-screen">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          Icon
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-32">
          <div className="text-center">
            <SplitText
              text="Alexis Eduardo Matamoros"
              className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
              delay={100}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <p className="my-8">
              <SplitText
                text="Experienced software developer with a strong background in both front-end and back-end development. Proven ability to deliver
                      high-quality solutions and a commitment to continuous professional growth.
                      "
                className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
                delay={10}
                animationFrom={{
                  opacity: 0,
                  transform: "translate3d(0,50px,0)",
                }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                easing="easeOutCubic"
                threshold={0.2}
                rootMargin="-50px"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-white hover:border hover:border-black hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                About me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
