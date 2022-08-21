import Footer from "../components/footer";
import Navbar from "../components/navbar";

// our-domain.com/my-page
function MyPage() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar></Navbar>
        <div className="flex justify-center items-center w-full px-4 sm:flex-row flex-col">
          {/* Holdings */}
          <div className="my-3 mx-7 max-w-lg w-full min-h-full rounded-lg overflow-hidden shadow-lg bg-neutral-100 text-gray-900 px-6 py-4 ">
            {/* Title */}
            <div className="font-bold text-xl mb-2">My Holdings</div>

            <div>
              <div className="flex justify-between">
                <span className="block rounded-full py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                  Tokens
                </span>
                <span className="text-right">QIT</span>
              </div>

              <div className="flex justify-between">
                <span className="block rounded-full py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                  Value
                </span>
                <span className="text-right">USDT</span>
              </div>

              <div className="flex justify-between">
                <span className="block  rounded-full py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                  Change
                </span>
                <span className="text-right">12%</span>
              </div>
            </div>
          </div>

          {/* Withdrawals */}
          <div className="min-h-full my-3 mx-7 max-w-lg w-full rounded-lg overflow-hidden shadow-lg bg-neutral-100 text-gray-900 px-6 py-4 ">
            {/* Title */}
            <div className="font-bold text-xl mb-2">My Withdrawals</div>

            <div>
              <div className="flex justify-between">
                <span className="block rounded-full py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                  Withdrawal Lockup Ends
                </span>
                <span className="text-right">21 May 2022 11:48 AM</span>
              </div>

              <div className="flex justify-between">
                <span className="block rounded-full py-1 text-base font-semibold text-gray-700 mr-2 mb-2">
                  Pending Withdrawals
                </span>
                <span className="text-right">0 QIT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-90vh mt-5 bg-white flex justify-center items-center w-full px-4 sm:flex-row flex-col text-black">
          <div>exchange</div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default MyPage;
