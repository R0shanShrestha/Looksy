import { useContext, useEffect, useRef, useState } from "react";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { PhotoContextProvider } from "../../context/PhotoContext";
import ImageCard from "../../components/ImageCard";
import { UserContextProvider } from "../../context/UserContext";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

// import required modules
import { Grid, Pagination } from "swiper/modules";
const ExplorePage = () => {
  // Context
  const {
    searchImage,
    storage,
    isLoading,
    SetServerMsg,
    setSearch,
    search,
    favImg,
  } = useContext(PhotoContextProvider);
  const { user, logged } = useContext(UserContextProvider);

  // states
  const [numPage, setNumPage] = useState(1);
  // ref
  // console.log(favImg);
  // callback
  const searchHandler = (e, type) => {
    e.preventDefault();
    if (logged) {
      if (search != "") {
        // console.log(type)
        switch (type) {
          case "search":
            // direct searching
            setNumPage(1);
            try {
              searchImage(search);
            } catch (error) {
              alert("error in ExplorePage");
            }
            break;
          case "more":
            // console.log(numPage)
            // Filtering with page number

            try {
              setNumPage((pre) => (pre += 1));
              // console.log(numPage)
              searchImage(search, numPage);
            } catch (error) {
              SetServerMsg({
                state: true,
                type: "other",
                msg: "Fail to Fetch",
              });
            }
            break;

          default:
            break;
        }
      } else {
        SetServerMsg({
          state: true,
          type: "other",
          msg: "Input Required",
        });
      }
    }
  };

  return (
    <div className="w-[80vw] h-[70vh]  mx-auto px-5 pt-1 mt-10 flex">
      {/* Left Side bar */}
      <div className=" min-w-[300px] flex flex-col p-2 gap-6">
        {/* User Account  */}
        <div className="bg-zinc-950 w-full py-3  px-2 rounded-md flex gap-3 items-center">
          <img
            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://img5.thuthuatphanmem.vn/uploads/2021/11/12/hinh-anh-anime-don-gian-hinh-nen-anime-don-gian-ma-dep_092443354.png"
            alt="Not found"
            className="w-[40px] h-[40px] object-cover rounded-full object-top bg-white"
          />
          <h1>{user?.username}</h1>
        </div>
        {/* Explore search  */}
        <div className="bg-zinc-950 w-full  px-2  py-3 rounded-md space-y-3">
          <h1 className="text-2xl font-semibold">
            Explore. Find. Get Inspired.
          </h1>
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Search Images..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              className="bg-white w-full p-2.5 rounded-md text-black placeholder:text-slate-600 text-sm outline-none"
            />
            <button
              onClick={(e) => {
                searchHandler(e, "search");
              }}
              className=" p-2 text-sm bg-blue-600 rounded-md hover:bg-blue-800 duration-300"
            >
              Search
            </button>
          </form>
          {/* Page infos */}
          <hr className="  border-slate-500 " />
          {storage != "" && (
            <div className="flex gap-2 text-sm flex-col">
              <div className="columns-2">
                <h1>Total Result: {storage?.total}</h1>
                <h1>Total pages: {storage?.total_pages + 1}</h1>
              </div>
              <h1>Displaying Images: {storage?.results?.length}</h1>
              <h1>
                Page: {numPage}/{storage?.total_pages + 1}
              </h1>
              {storage?.total_pages >= numPage && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      searchHandler(e, "more");
                    }}
                    className="border px-3 rounded-md bg-white text-slate-900 font-semibold outline-none py-1"
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Other Options */}
        <div className="bg-zinc-950 w-full  min-h-[50px] rounded-md flex flex-col justify-center px-2">
          <div className="flex items-center gap-3 cursor-pointer  p-2 hover:bg-slate-400 duration-500 transition-all hover:rounded-md  hover:font-bold">
            <span>
              <BsBookmarkHeartFill size={20} />
            </span>
            <h1>Saved Image</h1>
          </div>
          {favImg.length > 0 && (
            <div className="border-t mt-2 pt-2 pb-2 text-sm">
              Images: {favImg.length}
            </div>
          )}
        </div>
      </div>

      {/* Right portion */}
      <div className=" w-full p-2 gap-0   px-2 flex ">
        {isLoading != true ? (
          storage != "" ? (
            isLoading ? (
              <div className=" h-[50%] flex items-center justify-center w-full flex-col">
                {/* <h1 className="font-semibold text-xl">Loding Images ?</h1> */}
                <img
                  src="../../../public/loading_icon.gif"
                  alt="not found"
                  className="w-[80px]"
                />
                <h1>Loading images</h1>
              </div>
            ) : (
              <Swiper
                slidesPerView={3}
                grid={{
                  rows: 2,
                }}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="mySwiper "
              >
                {storage?.results?.map((imgInfos) => {
                  return (
                    <SwiperSlide className=" max-w-[300px] min-h-[300px]">
                      <div
                        className=" min-w-[300px] max-w-[300px] h-fit  rounded-xl overflow-hidden "
                        key={imgInfos.id}
                      >
                        <ImageCard data={imgInfos} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )
          ) : (
            <div className=" h-[50%] flex items-center justify-center">
              <h1 className="font-semibold text-xl">Search. what you want ?</h1>
            </div>
          )
        ) : (
          <div className=" h-[50%] flex items-center justify-center w-full flex-col">
            {/* <h1 className="font-semibold text-xl">Loding Images ?</h1> */}
            <img
              src="../../../public/loading_icon.gif"
              alt="not found"
              className="w-[80px]"
            />
            <h1>Loading images</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
