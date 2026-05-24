import "./App.css";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { GetToken } from "./utils/LocalStorageHandler";
import { UserContextProvider } from "./context/UserContext";
import { PhotoContextProvider } from "./context/PhotoContext";
// import { Analytics } from "@vercel/analytics";

const App = () => {
  const { userProfile, user, setLogged } = useContext(UserContextProvider);
  // checking the token state to update user state
  useEffect(() => {
    const token = GetToken("authToken");
    if (token) {
      userProfile();
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);


  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);

    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col text-white bg overflow-x-hidden no-scroller">
      {/* HEADER */}
      {/* <Analytics /> */}
      <Header />

      {/* TOAST */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
      {/* MAIN */}
      <main className="flex-1">
        <div
          className={`max-w-[1400px] mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8
          transition-all duration-300
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
