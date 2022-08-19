import Footer from "../components/footer";
import Navbar from "../components/navbar";

// our-domain.com/my-page
function MyPage() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar></Navbar>
        <p>My page</p>
      </div>
      <Footer></Footer>
    </>
  );
}

export default MyPage;
