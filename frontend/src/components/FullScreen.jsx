import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { PhotoContextProvider } from "../context/PhotoContext";

const FullScreen = ({data}) => {
  const { setFullScreen, isFullScreen } = useContext(PhotoContextProvider);
  return (
    <div className=" w-full h-full ">
      <div className=" text-2xl float-end p-2 flex">
        <span
          className="  hover:scale-150 hover:rotate-90 hover:text-blue-400 duration-500 text-xl w-fit h-fit"
          onClick={() => {
            setFullScreen(false);
          }}
        >
          <IoClose />
        </span>
      </div>
      <div>
        <img
          src={data.uri}
          alt="Not found"
          className=" h-fit max-h-[500px] w-full rounded object-contain object-top"
        />
        <div>
          <h1>{data.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default FullScreen;
