import { useEffect, useRef, useState } from "react";
import Carousel from "../components/carousel";
import useOnScreen from "../hooks/useOnScreen";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import {
  BlueGradient,
  PurpleBlueGradientCombined,
  PurpleGradient,
} from "../components/svg/GradientCircles";

// home page
function HomePage() {
  const carouselRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const carouselRefValue = useOnScreen(carouselRef);
  const [isCarouselRef, setCarouselRef] = useState(false);

  const lastRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isLastRef, setLastRef] = useState(false);
  const lastRefValue = useOnScreen(lastRef);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

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
      <div className="relative flex min-h-[calc(100vh_-_5rem)] items-center justify-center overflow-x-clip">
        {/* Circle */}
        <BlueGradient classNames="absolute -z-20 max-w-4xl sm:-translate-x-20 -translate-y-0 sm:scale-150 scale-[250%] top-0 left-0" />
        <PurpleGradient classNames="bottom-0 right-0 absolute -z-20 w-full max-w-7xl translate-y-20 md:translate-x-96 sm:translate-x-64 translate-x-48" />

        <div className="absolute z-20 grid max-w-7xl grid-cols-4 justify-center">
          <div className="col-span-4 text-center sm:col-span-2">
            <main className="relative mx-auto flex h-full items-center px-4 pt-10 sm:px-6 sm:pt-12 md:pt-16 lg:px-8 lg:pt-20 xl:pt-28">
              {/* Text part */}
              <div className="z-20 w-full items-start sm:text-center">
                <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                  <span className="block">Data Driven</span>
                  <span className="block text-gray-200">Investments</span>
                </h1>
                <span className="mt-3 text-center text-gray-200 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-2xl lg:mx-0">
                  Welcome to QuantiFi
                </span>
                <div className="z-20 mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                  {/* Get started button */}
                  <div>
                    <button className=" flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] px-8 py-3 text-base font-medium text-white transition-all duration-75 ease-in hover:opacity-80 md:py-4 md:px-10 md:text-lg">
                      <a href="qit-fund" className="h-full w-full">
                        Get started
                      </a>
                    </button>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    {/* Dashboard button */}
                    <div className="rounded-lg bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] p-0.5 sm:ml-3 ">
                      <button className="flex w-full items-center justify-center rounded-md bg-gray-100 px-8 py-3 text-base font-medium text-gray-900 transition-all duration-75 ease-in hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 md:py-3.5 md:px-8 md:text-lg">
                        <a href="/dashboard" className="h-full w-full">
                          View Dashboard
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="relative col-span-4 flex scale-125 items-center overflow-hidden pt-8 text-center sm:col-span-2 sm:scale-150 lg:text-right">
            <video
              className="h-full w-full overflow-hidden"
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
      </div>

      {/* Carousel */}
      <div className="flex justify-center">
        <div className="max-w-7xl overflow-hidden">
          <Carousel />
        </div>
      </div>

      {/* Join us section */}
      <div className="motion-safe:animate-fadeIn relative flex min-h-fit snap-start items-center justify-center overflow-x-clip py-32 align-middle">
        <PurpleBlueGradientCombined classNames="absolute -z-10 sm:scale-100 scale-125" />
        <div className="mx-2 text-center align-middle text-gray-200">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
            <span className="block drop-shadow-lg">Are you ready to join us?</span>
          </h1>
          <div className="mt-3 mr-0 text-center sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-2xl lg:mx-0">
            <span className="mr-0 drop-shadow">Find out more about QuantiFi.</span>
          </div>
          {/* Glowing buttons, need to stay together */}
          <div className="mt-5 max-h-16 ">
            <button
              className="btnAnimated font-lg prose h-14 w-8/12 rounded-2xl text-2xl shadow-md"
              onClick={(e) => {
                e.preventDefault();
                router.push("/qit-fund");
              }}
            >
              <div className="z-10 flex h-full w-full items-center justify-center">
                <div>Get started</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
