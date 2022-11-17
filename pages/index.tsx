import { useEffect, useRef, useState } from "react";
import Carousel from "../components/carousel";
import useOnScreen from "../hooks/useOnScreen";
import { motion } from "framer-motion";

// home page
function HomePage() {
  const carouselRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const carouselRefValue = useOnScreen(carouselRef);
  const [isCarouselRef, setCarouselRef] = useState(false);

  const [isBgTransition, setBgTransition] = useState(true);

  const lastRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isLastRef, setLastRef] = useState(false);
  const lastRefValue = useOnScreen(lastRef);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isCarouselRef) setCarouselRef(carouselRefValue);
    if (!isLastRef) setLastRef(lastRefValue);
  }, [carouselRefValue, lastRefValue]);

  useEffect(() => {
    if (videoRef) {
      videoRef.current!.play();
    }
  }, []);

  return (
    <>
      {/* 1 */}
      <motion.div
        className={`duration-3000 relative flex min-h-[calc(100vh_-_5rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-qdark to-black transition delay-300 ease-in-out sm:bg-black ${
          isBgTransition ? "via-[#225a7a]" : "via-[#8c2b4d]"
        }
`}
      >
        {/* Cone */}
        {/* <div className="absolute w-full max-w-full overflow-hidden cone min-w-fit"></div> */}
        <div className="z-0 grid justify-center grid-cols-4 max-w-7xl">
          <div className="col-span-4 text-center sm:col-span-2">
            <main className="relative flex items-center h-full px-4 pt-10 mx-auto sm:px-6 sm:pt-12 md:pt-16 lg:px-8 lg:pt-20 xl:pt-28">
              {/* Text part */}
              <div className="z-20 items-start w-full sm:text-center">
                <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                  <span className="block">Data Driven</span>
                  <span className="block text-gray-200">Investments</span>
                </h1>
                <span className="mt-3 text-center text-gray-200 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-2xl lg:mx-0">
                  Welcome to QuantiFi
                </span>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                  {/* Get started button */}
                  <div>
                    <button className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] px-8 py-3 text-base font-medium text-white transition-all duration-75 ease-in hover:opacity-80 md:py-4 md:px-10 md:text-lg">
                      <a href="#">Get started</a>
                    </button>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    {/* Dashboard button */}
                    <div className="rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] p-0.5 sm:ml-3 ">
                      <button className="flex w-full items-center justify-center rounded-md bg-gray-100 px-8 py-3 text-base font-medium text-gray-900 transition-all duration-75 ease-in hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 md:py-3.5 md:px-8 md:text-lg">
                        <a href="/dashboard">View Dashboard</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="relative z-10 flex items-center col-span-4 pt-8 overflow-x-hidden text-center scale-125 sm:col-span-2 sm:scale-150 lg:text-right">
            <video
              className="inline-block object-cover w-full h-full "
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/logoVid3.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </motion.div>

      {/* 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="z-20 flex justify-center pb-4 bg-black motion-safe:animate-fadeIn"
      >
        <div className="">
          <Carousel />
        </div>
      </motion.div>

      {/* 3 */}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex items-start justify-center py-32 motion-safe:animate-fadeIn min-h-fit snap-start bg-slate-50"
      >
        <div className="mx-2 text-center text-gray-900 dark:text-gray-900">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
            <span className="block">Are you ready to join us?</span>
          </h1>
          <div className="mt-3 mr-0 text-center sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-2xl lg:mx-0">
            <span className="mr-0">Find out more about QuantiFi.</span>
          </div>
          {/* Glowing buttons, need to stay together */}
          <div className="flex items-center justify-center mt-5 max-h-16">
            <motion.button className="items-center w-8/12 text-2xl text-center btnAnimated font-lg h-14 rounded-2xl">
              <div className="z-10">Get started</div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default HomePage;
