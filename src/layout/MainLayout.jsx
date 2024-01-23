import { Outlet } from "react-router-dom";
import Header from "../Page/navigation/Header";
import Footer from "../Page/navigation/Footer";


const MainLayout = () => {
    return (
      <main>
        <Header />
        <section className="min-h-screen">
          <Outlet />{" "}
        </section>
        <Footer />
      </main>
    );
};

export default MainLayout;