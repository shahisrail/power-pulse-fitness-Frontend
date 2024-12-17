import AdsNavbar from "@/Pages/Shared/AdsNavbar/AdsNavbar";
import Footer from "@/Pages/Shared/FooterPage/Footer/Footer";
import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <AdsNavbar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
