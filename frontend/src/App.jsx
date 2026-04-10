import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="bg min-h-screen flex flex-col text-white">
      {/* HEADER */}
      <Header />

      {/* your routes/layout */}

      <ToastContainer position="top-right" autoClose={2000} />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <div className="max-w-[1400px] mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default App;
