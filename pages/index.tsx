import Navbar from "../components/navbar";

// home page
function HomePage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="cone"></div>

      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-bold text-gray-200 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
            <span className="block xl:inline">Decentralized world of</span> <span className="block text-gray-200 xl:inline">cryptocurrency</span>
          </h1>
          <p className="mt-3 text-base text-white-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-gray-200">Buy, sell and earn crypto.</p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div>
              <button href="#" className="w-full h-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-br from-cyan-500 to-pink-500 md:py-4 md:text-lg md:px-10 hover:opacity-80 transition-all ease-in duration-75">
                Get started
              </button>
            </div>

            <div className="sm:mt-0 mt-2">
              {/* Dashboard button */}
              <div className="sm:ml-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 rounded-lg p-0.5 ">
                <button className="w-full flex items-center justify-center text-base font-medium rounded-md px-8 py-3 md:py-3.5 md:text-lg md:px-8 bg-gray-900 hover:bg-gray-700 transition-all ease-in duration-75">
                  <a href="/dashboard">View Dashboard</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
