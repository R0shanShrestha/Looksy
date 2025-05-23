import React, { useContext, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { PhotoContextProvider } from "./context/PhotoContext";
import PopobBanner from "./components/PopobBanner";
const App = () => {
  
  return (
    <>
      <div className="bg w-screen  h-dvh items-center relative  overflow-hidden justify-between  no-scroller  text-white">
        <Header />
            
        <PopobBanner  />

        <Outlet />
        <BottomBar />
        <Footer />
      </div>
    </>
  );
};

export default App;
