import React from "react";
import "./App.css";
import Header from "./components/Header";
import BottomBar from "./components/BottomBar";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="bg w-full h-dvh items-center flex flex-col overflow-hidden justify-between no-scroller  text-white">
        <Header />
        <Outlet />
        <BottomBar />
      </div>
    </>
  );
};

export default App;
