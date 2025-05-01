import React, { useContext, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import data from "../../../Data.json";
import ImageCard from "../../components/ImageCard";
import { PhotoContextProvider } from "../../context/PhotoContext";
import FullScreen from "../../components/FullScreen";
const Explore = () => {
  // States
  const {
    searchImage,
    storage,
    isLoading,
    search,
    isError,
    isFullScreen,
    setSearch,
  } = useContext(PhotoContextProvider);
  const [pageNum, setPagenum] = useState(1);
  const [fullImageUri, setFullImageUri] = useState({
    url: "",
    title: "",
    likes: 0,
  });
  const searchHandler = () => {
    if (search == "") {
      alert("Field is Empty");
    } else {
      searchImage(search, pageNum);
    }
  };

  // ref
  const lodAnim = useRef();
  const fullScr = useRef();

  useGSAP(() => {
    if (isLoading) {
      gsap.from(lodAnim.current, {
        duration: 1,
        rotate: 360,
        ease: "power1.inOut",
        repeat: -1,
      });
    }
  }, [isLoading]);

  useGSAP(() => {
    if (isFullScreen) {
      gsap.to(fullScr.current, {
        transform: "translate(0px, 0px)",
        duration: 0.5,
      });
    } else {
      gsap.to(fullScr.current, {
        transform: "translate(0, 100%)",
        duration: 0.5,
      });
    }
  }, [isFullScreen]);

  return (
    <div className=" w-full sm:w-[50vw] md:w-[80vw] p-3 xl:hidden   gap-3 flex flex-row  h-[70vh]">
      {/* halfScreen when img selected */}
      <div
        ref={fullScr}
        className="fixed z-40 translate-y-[100%]   cursor-pointer pb-10  pt-10 bg-black  max-h-[90%] bottom-0 px-5 right-0 rounded-s-2xl sm:w-[300px] md:w-[500px] shadow-xl shadow-slate-800"
      >
        <FullScreen data={fullImageUri} />
      </div>

      {/* search box  */}
      <div className="flex px-3 w-[30%] mx-auto    flex-col  gap-2 py-2">
        <h1 className="text-2xl font-semibold">Explore. Find. Get Inspired.</h1>
        <div className="flex items-center   w-full rounded-xl text-slate-900 gap-3">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            type="text"
            placeholder="Search Image..."
            className="p-3 outline-none rounded-md text-sm w-full bg-white text-slate-900 placeholder:text-slate-600"
          />
          <button
            onClick={() => {
              searchHandler();
            }}
            className=" text-white p-2.5 font-black rounded-md bg-blue-600"
          >
            Search
          </button>
        </div>
        {storage != "" && (
          <div className=" w-full flex-col  h-fit mt-3 flex justify-between items-center">
            <div className="flex gap-2 flex-col">
              <div>
                <h1 className=" font-semibold">
                  Here’s what we found for you:{" "}
                  <span className="font-bold">{search}</span>
                </h1>
                <p className="text-sm ">{storage?.total} results found</p>
              </div>

              <div>
                <p className="text-[10px] font-bold ">
                  {storage != "" ? storage.results?.length : "0"} Rendered
                  Images
                </p>
              </div>
            </div>
            {storage.total_pages == pageNum
              ? ""
              : storage != "" && (
                  <div className="flex mx-auto w-full flex-col  gap-2 py-2  ">
                    <p className="   w-full px-1 font-semibold">
                      Page: {pageNum}/{storage.total_pages}
                    </p>
                    <button
                      onClick={() => {
                        setPagenum((pre) => (pre += 1));
                        searchHandler();
                      }}
                      className="bg-blue-500 py-3 px-5 font-bold text-sm rounded-2xl w-fit "
                    >
                      Show More
                    </button>
                  </div>
                )}
          </div>
        )}
      </div>

      {isError.err ? (
        <h1 className=" text-center  text-3xl font-semibold">{isError.msg}</h1>
      ) : isLoading ? (
        <img
          ref={lodAnim}
          src="loading.png"
          className="w-[50px] h-[50px] mx-auto mt-10 mb-10 "
        />
      ) : storage == "" ? (
        <h1 className=" text-center  text-3xl font-semibold">
          Search What your want ?
        </h1>
      ) : (
        <div className="outputs px-5 py-3 flex-col flex-wrap no-scroller h-full w-[70%]  gap-1 overflow-hidden block md:flex  overflow-x-scroll overflow-y-scroll  ">
          {storage.results?.map(
            ({ id, alt_description, urls, likes, links }) => (
              <div
                key={id}
                className="max-w-[200px]"
               
              >
                <ImageCard
                  setFullImageUri={setFullImageUri}
                  image={urls.full}
                  title={alt_description}
                  key={id}
                  likeNum={likes}
                  download={links.download}
                />
              </div>
            )
          )}
        </div>
      )}

      {storage.total_pages == pageNum
        ? ""
        : storage != "" && (
            <div className="hidden   mx-auto w-full px-5 flex-col  gap-2 py-2 justify-center items-center">
              <p className="   w-full px-1 font-semibold">
                Page: {pageNum}/{storage.total_pages}
              </p>
              <button
                onClick={() => {
                  setPagenum((pre) => (pre += 1));
                  searchHandler();
                }}
                className="bg-blue-500 py-3 px-5 font-bold rounded-2xl w-fit "
              >
                Show More
              </button>
            </div>
          )}
    </div>
  );
};

export default Explore;
