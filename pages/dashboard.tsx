import Footer from "../components/footer";
import Navbar from "../components/navbar";

// our-domain.com/dashboard
function Dashboard() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar></Navbar>
        <p>Dashboard</p>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Dashboard;
