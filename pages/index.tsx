import { useRef } from "react";
import Carousel from "../components/carousel";
import useOnScreen from "../hooks/useOnScreen";

// home page
function HomePage() {
  const carouselRef = useRef();
  const carouselRefValue = useOnScreen(carouselRef);
  return (
    <div className="snap-y">
      {/* 1 */}
      <div className="flex justify-center items-center relative min-h-[calc(100vh_-_5rem)] bg-black snap-start ">
        {/* Cone */}
        <div className="absolute w-full max-w-full overflow-hidden min-w-fit cone"></div>

        <div className="grid justify-center grid-cols-4 max-w-7xl">
          <div className="col-span-4 sm:col-span-2">
            <main className="relative flex items-center h-full px-4 pt-10 mx-auto sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              {/* Text part */}
              <div className="items-start w-full sm:text-center ">
                <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                  <span className="block">The Decentralized world of</span>
                  <span className="block text-gray-200">Cryptocurrency</span>
                </h1>
                <span className="mt-3 text-center text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0">
                  Buy, sell and earn crypto.
                </span>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                  {/* Get started button */}
                  <div>
                    <button className="w-full h-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] md:py-4 md:text-lg md:px-10 hover:opacity-80 transition-all ease-in duration-75">
                      <a href="#">Get started</a>
                    </button>
                  </div>

                  <div className="mt-2 sm:mt-0">
                    {/* Dashboard button */}
                    <div className="sm:ml-3 bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] rounded-lg p-0.5 ">
                      <button className="w-full flex items-center justify-center text-base font-medium rounded-md px-8 py-3 md:py-3.5 md:text-lg md:px-8 hover:bg-gray-200 bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 transition-all ease-in duration-75 text-gray-900 dark:text-gray-200">
                        <a href="/dashboard">View Dashboard</a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>

          <div className="relative z-20 flex items-center col-span-4 pt-8 text-center sm:col-span-2 lg:text-right">
            <video
              className="inline-block object-cover w-full h-full scale-125 sm:scale-150"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/logoVid3.mp4" type="video/mp4;codecs=hvc1"></source>
              <source src="/logoVid3.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="z-20 pb-4 bg-black snap-start" ref={carouselRef.current}>
        {carouselRefValue && <Carousel />}
      </div>

      {/* 3 */}
      <div className="flex items-start justify-center py-32 min-h-fit bg-slate-50 snap-start">
        <div className="mx-2 text-center text-gray-900 dark:text-gray-900">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
            <span className="block">Are you ready to join us?</span>
          </h1>
          <div className="mt-3 mr-0 text-center sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0">
            <span className="mr-0">Find more information about QuantiFi.</span>
          </div>
          {/* Glowing buttons, need to stay together */}
          <div className="flex items-center justify-center mt-5 max-h-16">
            <button className="items-center w-8/12 text-2xl text-center btnAnimated rounded-2xl h-14 font-lg">
              <div className="z-10">Get started</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
