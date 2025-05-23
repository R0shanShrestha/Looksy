import React, { useContext, useRef } from "react";
import { MdNetworkWifi1Bar } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { PhotoContextProvider } from "../context/PhotoContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PopobBanner = () => {
  const { serverMsg, SetServerMsg } = useContext(PhotoContextProvider);
  // ref
  const popRef = useRef();

  useGSAP(() => {
    if (serverMsg) {
      gsap.to(popRef.current, {
        translateX: 0,
        duration: 1,
      });
    } else {
      gsap.to(popRef.current, {
        translateX: 100,
        duration: 1,
      });
    }
  }, [serverMsg]);

  

  return (
    <div
      ref={popRef}
      className=" w-fit  min-w-[300px]  fixed right-0 translate-x-100"
    >
      {serverMsg.type == "network" && (
        <span className="flex font-bold items-center gap-2  p-2 bg-red-400 rounded-s-xl">
          {" "}
          <MdNetworkWifi1Bar /> {serverMsg.msg}
        </span>
      )}
      {serverMsg.type == "success" && (
        <span className="flex font-bold items-center gap-2  p-2 bg-green-400 rounded-s-xl">
          {" "}
          <RiLoginCircleFill /> {serverMsg.msg}
        </span>
      )}
      {serverMsg.type == "other" && (
        <span className="flex font-bold items-center gap-2  p-2 bg-red-400 rounded-s-xl">
          {" "}
          <MdNetworkWifi1Bar /> {serverMsg.msg}
        </span>
      )}
    </div>
  );
};

export default PopobBanner;
