import React, { useContext, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { PhotoContextProvider } from "./context/PhotoContext";
const App = () => {
  const { isFullScreen } = useContext(PhotoContextProvider);
  
  return (
    <>
      <div className="bg w-screen h-dvh items-center flex flex-col overflow-hidden justify-between  no-scroller  text-white">
        <Header />
       
        <Outlet />
        <BottomBar />
        <Footer />
      </div>
    </>
  );
};

export default App;
