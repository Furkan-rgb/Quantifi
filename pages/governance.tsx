import Footer from "../components/footer";
import Navbar from "../components/navbar";

// our-domain.com/governance
function GovernancePage() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar></Navbar>
        <p>Governance page</p>
      </div>
      <Footer></Footer>{" "}
    </>
  );
}

export default GovernancePage;
