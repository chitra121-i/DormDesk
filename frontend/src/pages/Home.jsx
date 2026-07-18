import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import RoleSelection from "../components/RoleSelection";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
function Home() {
   const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <RoleSelection />
      <Footer />
     
    </>
  );
}

export default Home;