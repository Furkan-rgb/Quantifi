import Carousel from "../components/carousel";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// home page
function HomePage() {
  return (
    <>
      {/* 1 */}
      <div className="min-h-screen ">
        <Navbar></Navbar>
        {/* Background colour cone */}
        <div className="cone max-w-full"></div>

        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-full flex items-center absolute bottom-0 left-0">
          <div className="sm:text-center lg:text-left items-start">
            <h1 className="text-4xl tracking-tight font-bold text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
              <span className="block">The Decentralized world of</span>{" "}
              <span className="block text-gray-200">Cryptocurrency</span>
            </h1>
            <p className="mt-3 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0 text-gray-200">
              Buy, sell and earn crypto.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              {/* Get started button */}
              <div>
                <button className="w-full h-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-[#4FC0FF] via-[#6977EE] to-[#FF6098] md:py-4 md:text-lg md:px-10 hover:opacity-80 transition-all ease-in duration-75">
                  <a href="#">Get started</a>
                </button>
              </div>

              <div className="sm:mt-0 mt-2">
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
      {/* 2 */}
      <div className="">
        <Carousel></Carousel>
      </div>
      {/* 3 */}
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center mx-2">
          <h1 className="text-4xl tracking-tight font-bold text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
            <span className="block">Are you ready to join us?</span>
          </h1>
          <div className="mt-3 sm:mt-5 sm:text-lg text-center sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0 dark:text-gray-200 text-black mr-0">
            <span className="mr-0">Find more information about QuantiFi.</span>
          </div>
          {/* Glowing buttons, need to stay together */}
          <div className="flex justify-center items-center mt-5 max-h-16">
            <button className="btnAnimated rounded-2xl text-2xl w-8/12 h-14 font-lg text-center items-center">
              Get started
            </button>
            <button className="btnAnimated2 rounded-2xl text-2xl w-6/12 h-12 items-center"></button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
